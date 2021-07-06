const express = require("express");

const router = express.Router();

const Posts = require("./posts-model");

router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Posts.findById(id);
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      const comments = await Posts.findPostComments(id);
      res.status(200).json(comments);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The comments information could not be retrieved" });
  }
});

module.exports = router;
