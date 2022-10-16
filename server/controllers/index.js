const router = require('express').Router();
const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');

router.use('/users', userRoutes);
router.use('./notes', noteRoutes);


router.get("/", (req, res) => {
    res.json("Hello World");
})

module.exports = router;