const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt-nodejs");

function checkPassword (password, cpassword) {
    if (password === cpassword) {
        return true;
    } else {
        return false;
    }
};

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post("/", async (req, res) => {
    const { name, email, password, cpassword } = req.body;

    try {
        const isValid = checkPassword(password, cpassword);
        if (!isValid) {
            return res.json({
                title: "register",
                success: false,
                msg: "password and cpassword don't match"
            });
        }
        
        var user = await User.findOne({ email });
        if (user) {
            return res.json({
                title: "register",
                success: false,
                msg: "이미 존재하는 사용자입니다." 
            });
        }

        user = new User({
            name,
            email, 
            password
        })
        
        // db에 user 저장
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
            title: "register",
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            title: "register",
            success: false,
            err
        });
    }
});

module.exports = router;