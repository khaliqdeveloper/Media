const multer = require("multer");

// defining file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

//specifying file formats that can be save
function fileFilter(req, file, cb) {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    // To accept the file, pass `true`, like so:
    cb(null, true);
  } else {
    // To reject this file, pass `false`, like so:
    cb(
      new Error("Invalid file Type Only Images and Videos are allowed"),
      false
    );
  }
}

//file size formatter
// const fileSizeFormatter = (bytes, decimal) => {
//   if (bytes === 0) {
//     return "0 Bytes";
//   }
//   const dm = decimal || 2;
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
//   const index = Math.floor(Math.log(bytes) / Math.log(1000));
//   return (
//     parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
//   );
// };

const upload = multer({ storage, fileFilter });

module.exports = { upload };
