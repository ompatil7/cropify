const mongoose = require("mongoose");

const Store = require("./../models/storeModel");

const catchAsync = require("./../utils/catchAsync");

const AppError = require("./../utils/appErrors");

exports.getallstore = catchAsync(async (req, res, next) => {
  const doc = await Store.find();
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.createStore = catchAsync(async (req, res, next) => {
  const doc = await Store.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      dat: doc,
    },
  });
});

exports.updateStore = catchAsync(async (req, res, next) => {
  const doc = await Store.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError("no store with this id sorry try again", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.deleteStore = catchAsync(async (req, res, next) => {
  const doc = await Store.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(
      new AppError(
        "sorry no cproduct with this id please try again later or check again",
        404
      )
    );
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
