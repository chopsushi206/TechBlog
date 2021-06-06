const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Post, Comment } = require("../models");

//renders homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//renders login page
router.get("/login", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    res.status(200).render("login");
  } catch (err) {
    res.status(400).json(err);
  }
});

//renders signup page
router.get("/register", async (req, res) => {
  try {
    res.status(200).render("register");
  } catch (err) {
    res.status(400).json(err);
  }
});

//renders dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//renders post form
router.get("/post", withAuth, async (req, res) => {
  try {
    res.status(200).render("post");
  } catch (err) {
    res.status(400).json(err);
  }
});

//renders single post with corresponding comments
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    let post = postData.dataValues;
    let comments = commentData.map((comment) => comment.get({ plain: true }));
    res.render("comments", {
      post,
      comments
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//renders update post form
router.get("/update/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    let post = postData.dataValues;
    res.render("update", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
