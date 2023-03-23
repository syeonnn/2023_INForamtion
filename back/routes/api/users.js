const express = require('express');
const router = express.Router();
const { User } = require("../../models/User");
const { auth } = require("../../middleware/auth");

// @route  GET api/users/auth
// @desc   Execute auth middleware -> Send User info to Client 
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

// @route  POST api/users/update
// @desc   Update User with email
// @access Public
router.post("/update", async (req, res) => {
    console.log("route update 실행");

    // await User.updateOne({email: req.body.email}, {level:req.body.level})
    //     .then((result) => {
    //         res.send(result);
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //     })
    
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send({
            success: false,
            msg: "존재하지 않는 사용자입니다."
        });
    }


    // 해당 단어를 학습하지 않았을 때, array에 추가
    if (!user.studyList.includes(req.body.level)) {
        console.log("아직 학습하지 않은 단어");

        await User.updateOne(
            { email: req.body.email },
            { $push:{studyList : req.body.level }})
            .then((result) => {
                res.send({
                    success: false,
                    result
                });
            })
            .catch((err) => {
                console.error(err);
            })
    } else {
        console.log("이미 학습한 단어");

        res.send({
            success: true,
            msg: "이미 학습한 단어."
        })
    }
});


// @route  POST api/users/getUser
// @desc   Find User by email.  
// @access Public
router.post("/getUser", async (req, res) => {
    console.log("route getUser 실행");

    await User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if(err) return res.status(400).send(err);
            
            res.status(200).json({ 
                success: true, 
                user
            });
        });
});


// @route  POST api/users/login
// @desc   Find User by email and compare password. If it's same, generate Token.  
// @access Public
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


// @route  GET api/users/logout
// @desc   Find User by _id and clear token, tokenExp.
// @access Public
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