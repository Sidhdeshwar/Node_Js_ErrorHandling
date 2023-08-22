const productsModel = require("../module/products-module");
const API = require("./../utilities/apiClass");
const catchAsync = require("../utilities/catchError");
const createError = require("../utilities/craeteError");

// * ----------------------------------- getAll -----------------------------------------------
const getAllProducts = catchAsync(async (req, res, next) => {
  let allData;
  allData = new API(productsModel.find(), req.query)
    .filter()
    .sort()
    .fieldsPresent();
  allData = await allData.data;

  res.status(200).json({
    status: "Success",
    allData,
  });
});

// ? ----------------------------------- Add New -----------------------------------------------
const postProduct = catchAsync(async (req, res, next) => {
  let obj = await productsModel.create(req.body);
  res.status(201).json({
    status: "Success",
    obj,
  });
});
// * ----------------------------------- getOne -----------------------------------------------
const getOneProduct = catchAsync(async (req, res, next) => {
  let oneProd = await productsModel.findById(req.params.id);

  if (!oneProd) {
    return next(new createError("Not Found at Given ID", 404));
  }
  res.status(200).json({
    status: "Success",
    oneProd,
  });
});
// ^ ----------------------------------- Update -----------------------------------------------
const updateProduct = catchAsync(async (req, res, next) => {
  let updateProd = await productsModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      // name: req.body.name,
      new: true,
      runValidators: true,
    }
  );
  if (!updateProd) {
    return next(new createError("Not Found at Given ID", 404));
  }
  res.status(200).json({
    status: "Success",
    updateProd,
  });
});
// ! -----------------------------------Delete -----------------------------------------------
const deleteProduct = catchAsync(async (req, res, next) => {
  let deleteProd = await productsModel.findByIdAndDelete(req.params.id);
  if (!deleteProd) {
    return next(new createError("Not Found at Given ID", 404));
  }
  res.status(200).json({
    status: "Success",
    deleteProd,
  });
});

console.log("ARGV", process.argv);
module.exports = {
  getAllProducts,
  postProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
