const express = require("express");
const { getStories, storyCreate } = require("../controllers/Stories");

const Story = require("../models/Stories");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");

const { protect } = require("../middleware/auth");
router.post("/", protect, storyCreate);

router
  .route("/public")
  .get(
    advancedResults(Story, [{ path: "userId" }], { status: "public" }),
    getStories
  );

module.exports = router;
