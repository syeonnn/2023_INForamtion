const { User } = require('../models/User');

// @desc   사용자 인증 처리 미들웨어
// @access Public
let auth = (req, res, next) => {
    console.log("middleware auth 실행")
    
    let token = req.cookies.x_auth;
    console.log("token: ", token);
  
    User.findByToken(token, (err, user) => {
      if (err) throw err;

      console.log("findByToken 결과: ", user);
      
      if (!user)
        return res.json({
          isAuth: false,
          msg:"해당하는 토큰의 유저가 없음",
          error: true
        });

      
      req.token = token;
      req.user = user;
      
      next();
    });
  };
  
  module.exports = { auth };