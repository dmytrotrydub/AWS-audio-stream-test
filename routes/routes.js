const express = require("express");
const router = express.Router();
const operators = require("../route-operators/route-operators");
const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("audiofile"), async (req, res) => {
  const filename = "my first upload file";
  const bucketName = "tracks-storage";
  const file = req.file.buffer;
  console.log(file);

  const uploader = await operators.audioUpload(filename, bucketName, file);
  console.log(uploader);
  res.send("Upload successfull");
});

console.log("Created post route for file ");

module.exports = router;
