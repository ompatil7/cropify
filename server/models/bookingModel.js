const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  crop: {
    type: mongoose.Schema.ObjectId,
    ref: "Crop",
    required: [true, "Booking must belong to a crop!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a User!"],
  },
  price: {
    type: Number,
    required: [true, "Booking must have a price."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email photo",
  }).populate({
    path: "crop",
    select: "name soldby image", // Ensure _id is also included
    populate: {
      path: "soldby",
      select: "name",
    },
  });
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
