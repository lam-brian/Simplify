const router = require("express").Router();
const { Note, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/notes", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Note }],
    });
    const user = userData.get({ plain: true });
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;