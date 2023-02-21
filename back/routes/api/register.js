const express = require("express");
const User = require("../../models/User");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

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
            return res.status(402).json({ errors: [{ msg: "User already exists" }] });
        }

        // 1. 새로운 user 생성
        user = new User({
            name,
            email, 
            password
        })
        
        // 2. db에 user 저장
        await user.save();

        /*
        // 3. json web token 생성 -> client에 전달
        const payload = {
            user: {
                id: user._id,
            },
        };

        jwt.sign(
            payload, // token으로 변환할 데이터
            "jwtSecret", // secret key 값
            { expiresIn: "1h" }, // token 유효시간
            (err, token) => {
                if (err) throw err;
                res.status(200).send({token});
            }
        );
        */
        res.status(200).json({
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            err
        });
    }
});

module.exports = router;