const AppError = require("../error_handlers/appError");
const Object = require("./objectModel");
const catchAsync = require("../error_handlers/catchAsync");
const mongoose = require("mongoose");

exports.getObjectsWithin = catchAsync(async (req, res, next) => {
  try {
    //If specifying latitude and longitude coordinates, list the longitude first, and then latitude.

    // Valid longitude values are between -180 and 180,  both inclusive.

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
    } else if (lat > 90 || lat < -90 || lng > 180 || lng < -180) {
      next(
        new AppError(
          "Please Provide  the correct latitude in the range of [90 to -90] and longitude in the range of [180 to -180] in the format lat,lng",
          400
        )
      );
    }

    const radius = unit === "km" ? distance / 3963.2 : distance / 6378.1;

    const objects = await Object.find({
      location: {
        $geoWithin: { $centerSphere: [[lng, lat], radius] },
      },
      project: mongoose.Types.ObjectId(req.project._id),
    }).select("objId");
    //  console.log(distance,lat,lng,unit)
    res.status(200).json({
      status: "200_OK",
      results: objects.length,
      data: {
        objects,
      },
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
});

exports.getDistances = catchAsync(async (req, res, next) => {
  try {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(",");

    const proj_id = req.project._id;
    console.log(proj_id);
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

    res.status(200).json({
      status: "200_OK",
      // results:distances.length,
      unit: "Kilo meters(KM)",
      data: {
        distances,
      },
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
});
