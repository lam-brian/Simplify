const router = require("express").Router();
const { Note, User, Keyword } = require("../models");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Note }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;