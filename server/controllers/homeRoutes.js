const router = require("express").Router();
const { Note, User, Keyword } = require("../models");

router.get("/notes", async (req, res) => {
  try {
    const notes = await Note.findAll({ include: User });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: true,
      message: "Couldn't get notes.",
    });
  }
});

router.post("/keyword", async (req, res) => {
  const keyword = req.body;
  await Keyword.create(keyword);
  res.json(keyword);
});


router.get("/keyword/:noteId", async (req, res) => {
  const noteId = req.params.noteId;
  const keywords = await Keyword.findAll({ where: { note_id: noteId } });
  res.json(keywords);
});

module.exports = router;