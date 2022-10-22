const router = require("express").Router();
const { Note } = require("../../models");
const summarize = require("../../utils/summarize");

router.get("/", async (req, res) => {
  const listOfNotes = await Note.findAll();
  res.send(listOfNotes);
});

router.post("/", async (req, res) => {
  // const note = req.body;
  // await Note.create(note);
  // res.json(note);

  const { text } = req.body;
  const { summary, keywords } = await summarize(text);
  res.json({ summary, keywords });
});

module.exports = router;
