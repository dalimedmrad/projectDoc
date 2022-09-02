const router = require("express").Router();
const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
//post img
router.post("/upload1", (req, res) => {
  try {
    // console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: "Aucun fichier n'a été téléchargé." });
    const file = req.files.file;

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      async (err, result) => {
        if (err) throw err;

        removeTmp(file.tempFilePath);
        res.json({ url: result.secure_url });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
});
//delete image
// router.post("/destroy", (req, res) => {
//   try {
//     const { public_id } = req.body;
//     if (!public_id) return res.status(400).json({ msg: "No images Selected" });

//     cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
//       if (err) throw err;

//       res.json({ msg: "Deleted Image" });
//     });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
module.exports = router;
