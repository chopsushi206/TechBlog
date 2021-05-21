const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Post, Comment } = require("../models/user");

router.get("/", async (req, res) => {
  try {
    res.render("homepage");
  } catch (err) {
    res.status(400).json(err);
  }
});

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

module.exports = router;
