const archiver = require("archiver");
const { v4 } = require("uuid");
const fs = require("fs");
const path = require("path");

exports.zip = async (data) => {
  return new Promise((resolve, reject) => {

    const zipFilePath = path.join(
      __dirname,
      "../../resources/output",
      v4() + ".zip"
    );

    // Create a write stream to the zip file
    const output = fs.createWriteStream(zipFilePath);

    const archive = archiver("zip", {
      zlib: { level: 9 }, // Compression level
    });

    output.on("close", function () {
      resolve(zipFilePath);
      
      // Remove individual files after zip creation
      removeFile(data);
    });

    // Pipe the archive data to the output file
    archive.pipe(output);

    // Add each file to the archive
    data.forEach((file) => {
      const filePath = path.join(__dirname, "../../resources/output", file);
      archive.append(fs.createReadStream(filePath), { name: file });
    });
    archive.finalize();
  });
};

function removeFile(data) {
  data.forEach((file) => {
    const filePath = path.join(__dirname, "../../resources/output", file);
    fs.unlinkSync(filePath);
  });
}
