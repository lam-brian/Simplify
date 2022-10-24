const router = require("express").Router();
const { Note, User } = require("../../models");
const withAuth = require("../../utils/auth");
const summarize = require("../../utils/summarize");

router.post("/", async (req, res) => {
  const { text } = req.body;
  const { summary, keywords } = await summarize(text);
  res.json({ summary, keywords });
});

router.post("/newNote", withAuth, async (req, res) => {
  try {
    const newNote = await Note.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newNote)
    res.status(200).json(newNote);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
