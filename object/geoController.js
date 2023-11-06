const AppError = require("../error_handlers/appError");
const Object = require("./objectModel");
const catchAsync = require("../error_handlers/catchAsync");
const mongoose = require("mongoose");
const Paginator = require("../utils/pagination");
const Utility = require("../utils/utility");

exports.getObjectsWithin = catchAsync(async (req, res, next) => {
  try {
    //If specifying latitude and longitude coordinates, list the longitude first, and then latitude.

    // Valid longitude values are between -180 and 180, both inclusive.

    // Valid latitude values are between -90 and 90, both inclusive.
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(",");
    if (!lat || !lng) {
      next(
        new AppError(
          "Please Provide latitude and longitude in the format lat,lng",
          400
        )
      );
    }
    if (
      parseInt(lat) > 180 ||
      parseInt(lat) < -180 ||
      parseInt(lng) > 90 ||
      parseInt(lng) < -90
    ) {
      next(
        new AppError(
          "Please Provide latitude and longitude in the range of lat[-180,180], lng[-90,90]",
          400
        )
      );
    }

    const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

    const objects = await Object.find({
      location: {
        $geoWithin: { $centerSphere: [[lng, lat], radius] },
      },
      project: mongoose.Types.ObjectId(req.project._id),
    }).select("objId");

    const { page, pageSize } = req.query;
    const paginator = new Paginator(
      objects,
      page,
      pageSize,
      Utility.endPoint(req.originalUrl)
    );
    const data = paginator.paginate();
    //  console.log(distance,lat,lng,unit)
    res.status(200).json({
      status: "200_OK",
      data,
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
});

exports.getDistances = catchAsync(async (req, res, next) => {
  try {
    const { latlng } = req.params;
    const [lat, lng] = latlng.split(",");
    if (!lat || !lng) {
      next(
        new AppError(
          "Please Provide latitude and longitude in the format lat,lng",
          400
        )
      );
    }
    if (
      parseInt(lat) > 180 ||
      parseInt(lat) < -180 ||
      parseInt(lng) > 90 ||
      parseInt(lng) < -90
    ) {
      next(
        new AppError(
          "Please Provide latitude and longitude in the range of lat[-180,180], lng[-90,90]",
          400
        )
      );
    }

    const distances = await Object.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng * 1, lat * 1],
          },
          distanceField: "distance",
          distanceMultiplier: 0.001,
          query: {
            project: mongoose.Types.ObjectId(req.project._id),
          },
        },
      },
      {
        $project: {
          distance: 1,
          objId: 1,
        },
      },
    ]);

    const { page, pageSize } = req.query;
    const paginator = new Paginator(
      distances,
      page,
      pageSize,
      Utility.endPoint(req.originalUrl)
    );
    const data = paginator.paginate();

    res.status(200).json({
      status: "200_OK",
      unit: "Kilo Meters",
      data,
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
});
