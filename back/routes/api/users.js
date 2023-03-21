const express = require('express');
const router = express.Router();
const { User } = require("../../models/User");
const { auth } = require("../../middleware/auth");

// @route  GET api/users/auth
// @desc   auth 미들웨어 실행 -> user 정보를 클라이언트로 제공
// @access Public
router.get("/auth", auth, (req, res) => {
    console.log("/api/users/auth 실행");

    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        isAdmin: req.user.role === 0 ? false : true,
        email: req.user.email,
        name: req.user.name,
    });
});


router.post("/login", async (req, res) => {
    console.log("route login 실행");

    try {
        const user = await User.findOne({ email: req.body.email });

        console.log("find user: ", user);
        
        if (!user) {
            return res.json({
                loginSuccess: false,
                msg: "존재하지 않는 사용자입니다."
            });
        }
        
        user.comparePassword(req.body.password, (err, isMath) => {
            if (err) {
                console.log("comparePassword 에러");
                console.error(err);
                return res.status(400).json({err: err});
            }

            if (!isMath) {
                return res.json({
                    loginSuccess: false,
                    msg: "비밀번호가 틀립니다.",
                });
            }

            user.generateToken((err, user) => {
                if (err) {
                    console.log("generateToken 에러");
                    console.error(err);
                    return res.status(400).json({err: err});
                }

                res.cookie("w_authExp", user.tokenExp);
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    });
            });
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            loginSuccess: false,
            err
        });
    }
});

router.get("/logout", auth, (req, res) => {
    console.log("route logout 실행");

    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: ""})
        .then(() => {
            return res.status(200).json({
                success: true
            });
        }).catch((err) => {
            res.json({ success: false, err });
        });
    });


module.exports = router;