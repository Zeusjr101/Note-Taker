const router = require("express").Router();
const saveDB = require("../db/save_db");
const { v4: uuid } = require("uuid");
const fs = require("fs");


router.get("/notes", (req, res) => {
  saveDB
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
  const dbJson = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
  const newNote = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text,
  };

  dbJson.push(newNote);
  fs.writeFile("db/db.json", JSON.stringify(dbJson), (err) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      console.log("The file was saved!");
      res.redirect('/notes')
    }
  });
});

module.exports = router;
