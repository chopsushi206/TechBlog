const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//create a post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

//get all posts by all users
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get a # post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    console.log(post);
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [User],
    });
    console.log(commentData);
    res.status(200).json({ post });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

//updates existing post
router.put("/update/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//deletes post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(400).json({ message: "No posts match with this id" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
