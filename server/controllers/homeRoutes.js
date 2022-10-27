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



module.exports = router;