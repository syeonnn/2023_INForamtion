const User = require("../models/User");

// 인증 처리
const auth = (req, res, next) => {
    // 1. client cookie에서 토큰 가져오기
    const token = req.cookies.x_auth;

    // 2. token 디코딩
    User.findByToken(token, (err, user) => {
        if (err) throw err;
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

/*
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Get token from header
    // header의 "x-auth-token"은 token의 key 값
    const token = req.header("x-auth-token");

    // Check if there is not token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify token
    try {
        // Decode token 
        const decoded = jwt.verify(token, "jwtSecret");
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ msg: "Token is not Valid"});
    }
};
*/