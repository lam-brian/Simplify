const router = require("express").Router();
const { Note, User, Keyword } = require("../models");

router.get("/:uid", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.uid, {
      include: [{ model: Note }],
    });

    const user = userData.get({ plain: true });
    const { id, name, notes } = user;
    res.json({ id, name, notes });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
