const mongoose = require("mongoose");

const catchAsync = require("./../utils/catchAsync");

const appError = require("./../utils/appErrors");

const Email = require("./../models/emailModel");

exports.subscribe = catchAsync(async (req, res, next) => {
  const doc = await Email.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getAllSubscribe = catchAsync(async (req, res, next) => {
  const doc = await Email.find();

  if (!doc) {
    return next(
      new appError("sorry there are no user that are subscribed", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
