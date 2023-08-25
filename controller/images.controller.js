const multer = require("multer");

const uploadFileMiddleware = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
});

const postImage = (req, res, next) => {
  res.status(200).json({
    status: "success",
    info: req.file,
  });
};

module.exports = { postImage, uploadFileMiddleware };
