const router = require('express').Router();
const { User } = require('../models')

router.get("/", (req, res) => {
    res.send("Hello World");
})

router.post("/", async (req, res) => {
    const user = req.body;
    await User.create(user);
    res.json(user);
});

module.exports = router;