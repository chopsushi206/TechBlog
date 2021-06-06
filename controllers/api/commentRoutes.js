const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    req.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log(commentData);
    console.log(comments);
    res.status(200).json({ comments });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

module.exports = router;
