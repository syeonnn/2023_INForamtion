const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // 1. 해당 email의 user가 존재하는지 확인
        const user = await User.findOne({ email: email });

        console.log("find user: ", user);
        
        if (!user) {
            return res.status(401).json({
                title: "login",
                success: false,
                msg: "User does not exist",
            });
        }

        /*
        // 2. 비밀번호 확인
        const isMath = user.comparePassword(password);

        if (!isMath) {
            return res.status(402).json({
                success: false,
                msg: "Wrong password",
            });
        }

        // 3. 토큰 생성 -> 쿠키에 저장
        user.generateToken((err, user) => {
            if (err) return res.status(500).json({err: err});

            res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    success: true,
                    userId: user._id,
                });
        });
        */
        
        // 2. 비밀번호 비교
        user.comparePassword(password, (err, isMath) => {
            if (err) return res.status(500).json({err: err});
            if (!isMath) {
                return res.status(402).json({
                    title: "login",
                    success: false,
                    msg: "Wrong password",
                });
            }

            // 3. 토큰 생성 -> 쿠키에 저장
            user.generateToken((err, user) => {
                if (err) return res.status(500).json({err: err});

                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        title: "login",
                        success: true,
                        userId: user._id,
                    });
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            title: "login",
            success: false,
            err
        });
    }
});

// auth 미들웨어
// request를 받으면 callback func. 호출 전에 미들웨어 실행
router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        level: req.user.level,
    });
});

router.get("/logout", auth, (req, res) => {
    console.log("logout user: ", req.user);

    User.findOneAndUpdate({ _id: req.user._id }, {
        token: ""
    }, (err, user) => {
        if (err) return res.status(401).json({
            title: "logout",
            success: false,
            err
        });

        return res.status(200).json({
            title: "logout",
            success: true
        });
    });
});

module.exports = router;