const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/video", require("./routes/VideoRoutes"));

app.listen(PORT, (res) => {
  console.log(`Server Running on port ${PORT}`);
});
