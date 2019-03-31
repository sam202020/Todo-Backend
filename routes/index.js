const express = require("express");
const router = express.Router();
const todo = require("../models/todo");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

// returns all todos for a user
router.get("/todos", (req, res, next) => {
  const user = res.user;
  todo
    .find({ user })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.json(err);
      console.error(err);
    });
});

router.post("/todos", (req, res, next) => {
  const { title, description } = req.body;
  const user = res.user;
  console.log(title, description, user);
  todo
    .create({ title, description, user })
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => {
      res.json(err);
      console.error(err);
    });
});

router.put("/todos/edit/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  if (!id || id.length < 5) {
    console.log(id)
    throw new Error('Need to provide Todo ID')
  }
  const { title, description } = req.body
  todo
    .findByIdAndUpdate(id, {title, description})
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
      console.error(err.message);
    });
  });

router.delete("/todos/delete/:id", (req, res, next) => {
  const id = req.params.id;
  const ids = id.split(',');
  todo
    .deleteMany({_id: ids})
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err.message)
      console.error(err);
    });
});

module.exports = router;
