const multer = require("multer");
const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Crop = require("./../models/cropModel");
const AppError = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("not an image!! please upload an image", 400));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: multerFilter,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createCrop = catchAsync(async (req, res, next) => {
  // Create the Crop without setting the image URL
  const doc = await Crop.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.uploadimage = upload.single("image");

exports.resizeProductImage = catchAsync(async (req, res, next) => {
  // Log the filename of the temporary file
  // console.log("Temporary file:", req.file.filename);

  // Check if req.file exists
  if (!req.file) {
    return next();
    //return next(new AppError("No image found!", 400));
  }

  // Resize image using Sharp
  const imagePath = req.file.path;
  const resizedImagePath = `./public/temp/${req.file.filename}-resized.jpeg`;

  await sharp(imagePath)
    .resize({ width: 474, height: 497 })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(resizedImagePath);

  // Upload resized image to Cloudinary
  try {
    const result = await cloudinary.uploader.upload(resizedImagePath, {
      resource_type: "auto",
    });

    // Set the uploaded image URL in req.body
    req.body.image = result.secure_url;

    // Log the Cloudinary URL
    console.log("Cloudinary URL:", result.secure_url);

    console.log("req.body.image:", req.body.image);

    // Delete the temporary files
    // fs.unlinkSync(imagePath);
    // fs.unlinkSync(resizedImagePath);

    // Call next middleware
    next();
  } catch (err) {
    // fs.unlinkSync(imagePath); // Delete the original image if upload fails
    // fs.unlinkSync(resizedImagePath); // Delete the resized image if upload fails
    return next(new AppError("Error uploading image to Cloudinary", 500));
  }
});

exports.getCrop = catchAsync(async (req, res, next) => {
  const doc = await Crop.find()
    .sort({ createdAt: -1 })
    .populate("soldby", "name")
    .populate("ratings");

  if (!doc) {
    return next(new AppError("no product found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getsinglecrop = catchAsync(async (req, res, next) => {
  const doc = await Crop.findById(req.params.id)
    .populate("soldby", "name")
    .populate("ratings");
  if (!doc) {
    return next(new AppError("No doc found with that id ", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.updatecrop = catchAsync(async (req, res, next) => {
  const doc = await Crop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError("no doc foun with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.deleteCrop = catchAsync(async (req, res, next) => {
  const doc = await Crop.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError("no document found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.searchcrop = catchAsync(async (req, res, next) => {
  const searchQuery = req.query.name; // Change 'search' to 'name'

  // Perform a case-insensitive search for users with names containing the query
  const crop = await Crop.find({
    name: { $regex: new RegExp(searchQuery, "i") },
  });
  res.status(200).json({
    status: "success",
    data: {
      crop: crop,
    },
  });
});
