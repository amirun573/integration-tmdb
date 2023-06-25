const AWS = require("aws-sdk");

// Set the region
const fs = require("fs");
var path = require("path");

// Create S3 service object
// Configure the AWS SDK with your access credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

// Create an instance of the S3 service
const s3 = new AWS.S3();

class AWSService {
  constructor() {}

  async s3Upload(body) {
    // call S3 to retrieve upload file to specified bucket

    const { fileName, buffer } = body;
    const params = {
      Body: buffer,
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      acl: "private",
    };

    // call S3 to retrieve upload file to specified bucket
    s3.upload(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      }
      if (data) {
        console.log("Upload Success", data);
      }
    });

    return s3;
  }

  async saveImage(body) {
    const { fileName, buffer } = body;

    return await this.saveImages(`public/movies/${fileName}`, buffer);

    // Save the image buffer to the server
    // const status = fs.writeFile(`public/movies/${fileName}`, buffer, (err) => {
    //   if (err) {
    //     console.error("Error saving image:", err);
    //     return false;
    //   } else {
    //     console.log("Image saved successfully");
    //     return true;
    //   }
    // });
  }

  // Function to save the image buffer
  async saveImages(filePath, imageBuffer) {
    try {
      fs.writeFileSync(filePath, imageBuffer);
      return filePath; // Return true if the file is saved successfully
    } catch (err) {
      console.error("Error saving image:", err);
      return false; // Return false if there is an error
    }
  }
}
module.exports = AWSService;
