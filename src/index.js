const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res, next) => {
  res.send("Test Node JS");
});
app.use("/api/video", require("./routes/VideoRoutes"));

app.listen(PORT, (res) => {
  console.log(`Server Running on port ${PORT}`);
});
