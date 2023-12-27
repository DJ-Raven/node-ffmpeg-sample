const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const { v4 } = require("uuid");

const videoPath = path.join(__dirname, "../../resources", "sample_video.mp4");
const outputPath = path.join(__dirname, "../../resources/output");

const video = function () {};

video.screenshots = async (option) => {
  return new Promise((resolve, reject) => {
    let output;
    ffmpeg(videoPath)
      .on("filenames", function (filenames) {
        console.log("Generate " + filenames.join(", "));
        output = filenames;
      })
      .on("end", function (filenames) {
        console.log("Generated successfully");
        resolve(output);
      })
      .on("error", function (err) {
        console.log("Error generating " + err);
        reject(err);
      })
      .takeScreenshots(
        {
          count: option.count,
          size: "300x?",
          filename: v4(),
        },
        outputPath
      );
  });
};

module.exports = video;
