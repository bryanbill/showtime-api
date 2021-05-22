const path = require("path");
const fs = require("fs");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

const Story = require("../models/Stories");
const { nextTick } = require("process");

/**
 *@desc Get Stories
 *@route GET /api/v1/stories/public
 *@access Public
 */

exports.getStories = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @desc Create Story
 * @route PUT /api/v1/story
 * @access Private
 */

exports.storyCreate = asyncHandler(async (req, res, next) => {
  let storyModel = await Story.create({ userid: req.user._id });

  if (!req.files) {
    return next(new ErrorResponse("Please Upload a file", 404));
  }

  const file = req.files.file;

  console.log(file.size, process.env.MAX_FILE_UPLOAD * 5);

  if (file.size > process.env.MAX_FILE_UPLOAD * 5) {
    await storyModel.remove();
    return next(
      new ErrorResponse("Video Size too large, upgrade to premium", 404)
    );
  }

  file.originalName = file.name.split(".")[0];
  file.name = `story-${storyModel._id}${path.parse(file.name).ext}`;

  file.mv(
    `${process.env.FILE_UPLOAD_PATH}/stories/${video.name}`,
    async (err) => {
      if (err) {
        await storyModel.remove();
        console.log(err);
        return next(new ErrorResponse("Server Error", 500));
      }
      storyModel = await Story.findByIdAndUpdate(storyModel._id, {
        url: file.name,
        title: file.originalName,
      });
      res.status(200).json({ success: true, data: storyModel });
    }
  );
});
