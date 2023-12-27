const video = require("../models/Video");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const utils = require("../models/Utils");

exports.screenshots = async (req, res, next) => {
  try {
    const option = req.query;
    //  Create screenshots
    const data = await video.screenshots(option);
    // Create zip file
    const zip = await utils.zip(data);
    res.download(zip);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.stream = async (req, res, next) => {
  // Create video path
  const videoPath = path.join(
    __dirname,
    "../../resources",
    "sample_video.mp4"
  );

  // Create a read stream for the input video file
  const inputVideoStream = fs.createReadStream(videoPath);

  // Set response headers for video streaming
  res.setHeader("Content-Type", "video/mp4");
  res.setHeader("Accept-Ranges", "bytes");

  // Run ffmpeg command to read from the input stream and write to response
  ffmpeg()
    .input(inputVideoStream)
    .outputFormat("mp4") // Output format
    .outputOptions(["-movflags frag_keyframe+empty_moov"]) // For streaming MP4
    .on("end", () => {
      console.log("Finished streaming");
    })
    .on("error", (err) => {
      console.error("Error while streaming:", err);
    })
    .pipe(res, { end: true }); // end = true, Close output stream after writing
};