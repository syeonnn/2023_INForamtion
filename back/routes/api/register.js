const express = require("express");
const router = express.Router();
const { User } = require("../../models/User");
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
                registerSuccess: false,
                msg: "password and cpassword don't match"
            });
        }
        
        
        var user = await User.findOne({ email });
        if (user) {
            return res.json({
                registerSuccess: false,
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

        res.status(200).json({
            registerSuccess: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            registerSuccess: false,
            err
        });
    }
});

module.exports = router;