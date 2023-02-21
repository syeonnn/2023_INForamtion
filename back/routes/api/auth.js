const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

// @route  GET api/auth
// @desc   Auth
// @access Public
router.get("/", auth, async (req, res) => {
    try {
        // auth 미들웨어에서 생성한 req.user를 사용해 DB에서 user 탐색
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;