const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");

function checkPassword (password, cpassword) {
    if (password === cpassword) {
        return true;
    } else {
        return false;
    }
};

// @route  POST api/register
// @desc   Register user
// @access Public
router.post("/", async (req, res) => {
    const { name, email, password, cpassword } = req.body;

    try {
        // 비밀번호 확인
        const isValid = checkPassword(password, cpassword);
        if (!isValid) {
            return res.status(401).json({ errors: [{ msg: "password and cpassword don't match" }] });
        }
        
        // email 비교 -> 이미 존재하는지 확인
        var user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }

        // 1. 새로운 user 생성
        user = new User({
            name,
            email, 
            password
        })
        
        // 2. password 암호화
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 3. db에 user 저장
        await user.save();

        res.status(200).send("Success");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;