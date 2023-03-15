const { User } = require("../models/User");

// 인증 처리
const auth = (req, res, next) => {
    console.log("middleware auth 실행")

    // 1. client cookie에서 토큰 가져오기
    const token = req.cookies.x_auth;

    // 2. token 디코딩
    User.findByToken(token, (err, user) => {
        if (err) throw err;

        console.log("토큰으로 찾은 사용자: ", user);
        
        if (!user) {
            return res.json({
                isAuth: false,
                error: true
            });
        }

        req.token = token;
        req.user = user;
        next();
    });
};

module.exports = auth;