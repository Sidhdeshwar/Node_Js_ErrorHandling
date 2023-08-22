const productsModel = require("./../module/products-module");
const catchAsync = require("../utilities/catchError");

const aggreState = async (req, res, next) => {
  try {
    const aggregation = await productsModel.aggregate([
      {
        $match: { price: { $gte: 10 } },
      },
      {
        $group: {
          _id: { $toLower: "$name" },
          qty: { $sum: 1 },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          maxP2: { $max: "$price" },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      {
        $match: { qty: 0 },
      },
      {
        $match: { _id: { $ne: "tata" } }, // ne = not equal to
      },
    ]);

    res.status(200).json({
      status: "Success",
      aggregation,
    });
  } catch (err) {
    res.status(404).json({
      status: "Bad Request",
      message: err,
    });
  }
};

//
const unwindState = async (req, res) => {
  try {
    let startMonth = req.params.startMonth;
    let endMonth = req.params.endMonth;
    const unwindVar = await productsModel.aggregate([
      {
        $unwind: "$model",
      },
      {
        $match: {
          date: {
            $gte: new Date(`2023-${startMonth}-01`),
            $lte: new Date(`2023-${endMonth}-30`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" }, // group by "month" inside Date
          count: { $sum: 1 },
          users: { $push: "$name" },
        },
      },
      {
        $addFields: { month: "$_id" }, // New Field Added
      },
      {
        $project: { _id: 0 }, // Hide Field
      },
      {
        $sort: { month: 1 }, // Sort objects by- month
      },
      {
        $limit: 2,
      },
    ]);

    res.status(200).json({
      status: "Success",
      unwindVar,
    });
  } catch (err) {
    res.status(404).json({
      status: "Bad Request",
      message: err,
    });
  }
};

module.exports = { aggreState, unwindState };
