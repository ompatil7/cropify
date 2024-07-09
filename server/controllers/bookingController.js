// bookingController.js

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Crop = require("./../models/cropModel");
const catchAsync = require("./../utils/catchAsync");

const Booking = require("../models/bookingModel");
const AppError = require("../utils/appErrors");
const Email = require("./../utils/email");
const ExcelJS = require("exceljs");
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const crop = await Crop.findById(req.params.id);

  const image = crop.image;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://localhost:5173/crops/?crop=${req.params.id}&user=${req.user.id}&price=${crop.price}`,
    cancel_url: `${req.protocol}://localhost:5173/crops/${crop.id}`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${crop.name} crop`,
            description: crop.name,
            images: [image],
          },
          unit_amount: crop.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // Include address collection
    billing_address_collection: "required",
  });
  res.status(200).json({
    status: "success",
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res) => {
  try {
    const { crop, user, price } = req.query;

    if (!crop || !user || !price) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const booking = await Booking.create({ crop, user, price });

    const updatedCrop = await Crop.findByIdAndUpdate(
      crop,
      { $inc: { quantity: -1 } },
      { new: true }
    );

    if (!updatedCrop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    await booking.populate("crop");

    const url = `${req.protocol}://localhost:5173/profile`;

    const email = new Email(req.user, url);
    await email.sendBookingReceipt(booking);

    res.status(200).json({ message: "Data stored successfully", booking });
  } catch (error) {
    console.error("Error storing data:", error);

    res.status(500).json({ message: "Internal server error" });
  }
});

exports.getsinglebooking = catchAsync(async (req, res, next) => {
  const book = await Booking.findById(req.params.id);
  res.status(200).json({
    book,
  });
});

exports.getallbookings = catchAsync(async (req, res, next) => {
  const book = await Booking.find({ crop: { $ne: null } });
  const bookingsWithNullCrop = book.filter((booking) => booking.crop != null);

  console.log("Bookings with null crop:", bookingsWithNullCrop);

  // Sort the bookings array by createdAt field in descending order
  bookingsWithNullCrop.sort((a, b) => b.createdAt - a.createdAt);

  if (!bookingsWithNullCrop || bookingsWithNullCrop.length === 0) {
    return next(new AppError("Sorry, there are no bookings", 404));
  }

  // Calculate total revenue
  const totalRevenue = bookingsWithNullCrop.reduce(
    (total, booking) => total + booking.price,
    0
  );

  res.status(200).json({
    status: "success",
    total: bookingsWithNullCrop.length,
    totalRevenue: totalRevenue,
    data: {
      data: bookingsWithNullCrop,
    },
  });
});

exports.getbookingstats = catchAsync(async (req, res, next) => {
  const stats = await Booking.aggregate([
    {
      $match: {
        crop: { $ne: null },
      },
    },
    {
      $lookup: {
        from: "crops",
        localField: "crop",
        foreignField: "_id",
        as: "cropDetails",
      },
    },
    {
      $group: {
        _id: "$cropDetails.name",
        numofusers: { $sum: 1 },
        totalRevenue: { $sum: "$price" },
        avgPrice: { $avg: "$price" },
      },
    },
    {
      $match: {
        _id: { $ne: [] },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      doc: stats,
    },
  });
});

exports.mypurchase = catchAsync(async (req, res, next) => {
  const purchase = await Booking.find({ user: req.user.id });

  const productid = purchase.map((el) => el.crop);
  const crops = await Crop.find({ _id: { $in: productid } });
  res.status(200).json({
    status: "success",
    individualpurchase: crops.length,
    data: {
      crops,
    },
  });
});

const Cart = require("../models/cartModel");

exports.addToCart = catchAsync(async (req, res, next) => {
  const cropId = req.params.cropId;
  const { quantity } = req.body;
  const userId = req.user.id;

  const crop = await Crop.findById(cropId);

  if (!crop) {
    return res.status(404).json({ message: "Crop not found" });
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId });
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.crop.toString() === cropId
  );

  if (existingItemIndex !== -1) {
    // If item exists in cart, update quantity and recalculate price
    cart.items[existingItemIndex].quantity += quantity || 1;
    cart.items[existingItemIndex].price =
      crop.price * cart.items[existingItemIndex].quantity;
  } else {
    // If item does not exist in cart, add it with quantity and price
    const price = crop.price * (quantity || 1);
    cart.items.push({ crop: cropId, quantity: quantity || 1, price });
  }

  await cart.save();

  res.status(200).json({
    status: "success",
    cart,
  });
});

exports.myCart = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const mycart = await Cart.findOne({ user: userId }).populate({
    path: "items",
    populate: {
      path: "crop",
      select: "name image type",
    },
  });
  if (!mycart) {
    return next(new AppError("sorry there is no cart you have build up", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: mycart,
    },
  });
});
exports.deleteFromCart = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const cropId = req.params.cropId;

  // Find the user's cart
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  // Find the index of the item to be deleted
  const itemIndex = cart.items.findIndex(
    (item) => item.crop.toString() === cropId
  );

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  // Remove the item from the cart
  cart.items.splice(itemIndex, 1);

  // Save the updated cart
  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Item deleted from cart",
  });
});

exports.createCheckoutSessionForCart = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items",
      populate: {
        path: "crop",
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Prepare line items for the checkout session
    const lineItems = cart.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: `${item.crop.name} crop`,
          description: item.crop.name,
          images: [item.crop.image],
        },
        unit_amount: item.crop.price * 100,
      },
      quantity: item.quantity,
    }));

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${req.protocol}://localhost:5173/cart/?${cart.items
        .map(
          (item) =>
            `crop=${item.crop.id}&user=${req.user.id}&price=${item.crop.price}`
        )
        .join("&")}`,
      cancel_url: `${req.protocol}://localhost:5173/crops/`,
      customer_email: req.user.email,
      line_items: lineItems,
      mode: "payment",
      billing_address_collection: "required",
    });

    res.status(200).json({
      status: "success",
      session,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Backend code
exports.createBookingCheckoutcart = catchAsync(async (req, res) => {
  try {
    const { crops, users, prices } = req.query;

    // Split the query parameters by ',' to get individual products
    const cropArr = crops.split(",");
    const userArr = users.split(",");
    const priceArr = prices.split(",");
    console.log(cropArr);

    // Ensure all arrays have the same length
    if (
      cropArr.length !== userArr.length ||
      userArr.length !== priceArr.length
    ) {
      return res.status(400).json({ message: "Invalid URL parameters" });
    }

    // Store booking information for each product in the database
    const bookings = await Promise.all(
      cropArr.map(async (cropId, index) => {
        return await Booking.create({
          crop: cropId,
          user: userArr[index],
          price: parseInt(priceArr[index]), // Parse price to number
          // Add any additional fields you want to store
        });
      })
    );

    res.status(200).json({
      status: "success",
      bookings,
    });
  } catch (error) {
    console.error("Error handling success URL data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

exports.createreport = catchAsync(async (req, res, next) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("bookingsdata");
  worksheet.columns = [
    { header: "S.no", key: "s_no", width: 5 },
    { header: "Crop ID", key: "cropId", width: 29 },
    { header: "Product Name", key: "productName", width: 29 },
    { header: "User Name", key: "userName", width: 29 },
    { header: "User Email", key: "userEmail", width: 29 },
    { header: "Price", key: "price", width: 29 },
    { header: "Paid", key: "paid", width: 5 },
    { header: "Date & Time", key: "dateTime", width: 29 },
  ];

  const { year } = req.query; // Extract selected year from query parameters

  let query = {};

  // Filter bookings based on the selected year
  if (year) {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);
    query.createdAt = { $gte: startDate, $lte: endDate };
  }

  const book = await Booking.find(query);
  const bookings = book.filter((booking) => booking.crop != null);
  let rowNum = 2;
  bookings.forEach((booking, index) => {
    worksheet.addRow({
      s_no: index + 1,
      cropId: booking.crop.id,
      productName: booking.crop.name,
      userName: booking.user.name,
      userEmail: booking.user.email,
      price: booking.price,
      paid: booking.paid ? "Yes" : "No",
      dateTime: booking.createdAt,
    });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=bookingsdata.xlsx"
  );
  await workbook.xlsx.write(res);
});
