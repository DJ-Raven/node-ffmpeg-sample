const express = require("express");
const videoController = require("../controllers/VideoController");
const router = express.Router();

router.get("/screenshots", videoController.screenshots);
router.get("/stream", videoController.stream);
module.exports = router;
