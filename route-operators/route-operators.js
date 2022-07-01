const { fsyncSync } = require("fs");
const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const AWS = require("aws-sdk");
require("dotenv").config({ path: ".env" });

console.log(`${process.env.URL}${process.env.PORT}`);
//? updating AWS configuration
AWS.config.update({
  region: 'ca-central-1',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SEC_ACC_KEY,
  },
  endpoint: new AWS.Endpoint(`${process.env.URL}${process.env.PORT}`),
});

//? created new s3 bucket for audio uploads
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SEC_ACC_KEY,
  endpoint: new AWS.Endpoint(`${process.env.URL}${process.env.PORT}`),
});

// ? created a function that uploads file into bucket
const audioUpload = (fileName, bucketName, file) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: fileName,
      Bucket: bucketName,
      Body: file,
      ContentType: "audio/mp3",
      ACL: "public-read",
    };
    console.log(params);

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = {
  audioUpload,
};
