const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//All authors route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name !== null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  const authors = await Author.find(searchOptions);
  res.render("authors/index", { authors, searchOptions: req.query });
});

//New authors route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//Create author route
router.post("/", async (req, res) => {
  const author = new Author({ name: req.body.name });

  try {
    const newAuthor = await author.save();
    res.redirect("authors");
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author",
    });
  }

  // author.save((err, newAuthor) => {
  //   if (err) {
  //     res.render("authors/new", {
  //       author: author,
  //       errorMessage: "Error creating author",
  //     });
  //   } else {
  //     res.redirect("authors");
  //   }
  // });
});

module.exports = router;
