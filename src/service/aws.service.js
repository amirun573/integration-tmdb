const AWS = require("aws-sdk");
// Set the region
const fs = require("fs");
var path = require("path");

// Create S3 service object
// Configure the AWS SDK with your access credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region:process.env.S3_REGION
});

// Create an instance of the S3 service
const s3 = new AWS.S3();

class AWSService {
  constructor() {}

  async s3Upload(body) {
    // call S3 to retrieve upload file to specified bucket
    var uploadParams = { Bucket: process.env.S3_BUCKET, Key: "", Body: "" };


    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      }
      if (data) {
        console.log("Upload Success", data);
      }
    });
  }
}
module.exports = AWSService;
