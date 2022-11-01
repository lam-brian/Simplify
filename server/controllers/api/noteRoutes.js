const router = require("express").Router();
const { Note } = require("../../models");
const summarize = require("../../utils/summarize");
const webscrape = require("../../utils/webscrape");

router.post("/", async (req, res) => {
  const { url, text } = req.body;

  let rawText = text;

  if (!url && !text) {
    return res.status(400).json({ error: "No inputs" });
  }

  try {
    if (url) rawText = await webscrape(url.trim());
  } catch (err) {
    return res.status(400).json(err);
  }

  let summaryData;

  try {
    summaryData = await summarize(rawText);
  } catch (err) {
    return res.status(400).json(err);
  }

  if (!summaryData.summary || !summaryData.keywords) {
    return res.status(400).json({ error: "Unable to summarize" });
  }

  res.json(summaryData);
});

router.post("/newNote", async (req, res) => {
  try {
    const newNote = await Note.create({
      ...req.body,
      user_id: req.body.userId,
    });
    res.status(200).json(newNote);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:nid", async (req, res) => {
  try {
    const deletedNote = await Note.findOne({
      where: {
        id: req.params.nid,
      },
    });
    deletedNote.destroy();
    res.status(200).json({ message: "Note Deleted" });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
