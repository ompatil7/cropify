const Review = require("./../models/reviewModel");
const catchAsync = require("./../utils/catchAsync");

exports.setCropUserIds = (req, res, next) => {
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  if (!req.body.crop) {
    req.body.crop = req.params.cropId;
  }
  next();
};

exports.createReview = catchAsync(async (req, res, next) => {
  const doc = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getallreview = catchAsync(async (req, res, next) => {
  const doc = await Review.find();
  const Reviewwithnull = doc.filter((rev) => rev.crop != null);
  res.status(200).json({
    status: "success",
    data: {
      data: Reviewwithnull,
    },
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const doc = await Review.findByIdAndUpdate(req.params.id, req.body, {
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

exports.deleteOne = catchAsync(async (req, res, next) => {
  const doc = await Review.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError("no document found with that id", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function selectUniqueReviews(reviews, num) {
  const selectedUserNames = new Set();

  // Use filter and map to select unique reviews
  const uniqueReviews = reviews.filter((review) => {
    if (!selectedUserNames.has(review.user.name)) {
      selectedUserNames.add(review.user.name);
      return true;
    }
    return false;
  });

  // Slice the array to select the specified number of reviews
  return uniqueReviews.slice(0, num);
}
exports.home = catchAsync(async (req, res) => {
  const reviews = await Review.find();

  // Shuffle the reviews array
  const shuffledReviews = shuffle(reviews);

  // Select the first three reviews with unique user names
  const randomReviews = selectUniqueReviews(shuffledReviews, 3);

  res.status(200).json({
    status: "success",
    data: {
      data: randomReviews,
    },
  });
});
