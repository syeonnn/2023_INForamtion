// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');

module.exports = function (app) {

var router = require('express').Router();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var crypto = require("crypto");
// var flash = require("connect-flash");
var { body, validationResult } = require("express-validator");
var mysql = require('../db/mysql.js');

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(cookieParser());
// router.use(passport.initialize());
// router.use(passport.session());
// router.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log("serializeUser :", user)
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log("deserializeUser id :", id)
    
    var userinfo;
    var sql = 'SELECT * FROM USERS WHERE email=?';

    mysql.query(sql , [id], function (err, result) {
        if(err) console.log(err);     
        
        console.log("deserializeUser mysql result : " , result);
        var temp = JSON.stringify(result[0]);
        userinfo = JSON.parse(temp);
        done(null, userinfo);
    })    
});

// 회원가입 strategy
/**
 회원가입 유효성 검사
- 이름 글자수 3 이상 ~ 20 미만
- password 와 cpassword 일치
- 이메일 형식이 맞는지 (@email.com)
*/
function checkPassword (password, cpassword) {
    if (password === cpassword) {
        return true;
    } else {
        return false;
    }
};

function validPassword (password, hash, salt) {
    console.log("valid password...start");
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    console.log(hash === hashVerify);
    return hash === hashVerify;
};

function genPassword (password) {
    const salt = crypto.randomBytes(32).toString("hex");
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

    return {
        salt: salt,
        hash: genHash
    };
};

passport.use("local-join", new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {

        const isValid =  checkPassword(password, req.body.cpassword);
        if (!isValid) {
            console.log("비밀번호가 다름");
            return done(null, false, {message : "비밀번호가 다릅니다."}); 
        } 

        var sql = 'SELECT * FROM USERS WHERE email=?';
        mysql.query(sql , [email], function (err, results) {
            if(err) console.log(err);   

            console.log("mysql results: ", results);

            if(results.length){
                console.log("존재하는 사용자");
                return done(null, false, {message : "이미 존재하는 이메일입니다."});
            } else {
                console.log("존재하지 않는 사용자");

                const saltHash = genPassword(password);
                const salt = saltHash.salt;
                const hash = saltHash.hash;

                var sql = 'INSERT INTO USERS(name, email, password, salt) values(?,?,?,?)';
                
                mysql.query(sql, [req.body.name, email, hash, salt], (err, datas) => {
                    if (err) console.log(err);
                    return done(null, {
                        "id" : email,
                        "datas" : datas
                    });
                });
            }
        });
    }
));

// 로그인 strategy
passport.use("local-login", new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        // passReqToCallback: true
    },
    function(email, password, done) {
        var sql = 'SELECT * FROM USERS WHERE email=?';

        mysql.query(sql , [email], function (err, results) {
            if(err) console.log(err);   

            console.log("mysql results: ", results);

            if(results.length <= 0) {
                console.log("로그인 실패:존재하지 않는 사용자");
                // return done(null, false, { message : "아이디가 틀립니다." });
                return done(null, false);
            } else {
                console.log("존재하는 사용자");

                const isValid = validPassword(password, results[0].password, results[0].salt);

                if (isValid) {
                    console.log("로그인 성공")
                    return done(null, { "id" : email });
                } else {
                    console.log("로그인 실패:비밀번호 에러");
                    return done(null, false, { message : "비밀번호가 틀립니다."});
                }
            }
        });
    }
));



/* Routers */
router.get("/", (req, res, next) => {
  var msg;
  var errMsg = req.flash("error");
  if (errMsg) {
      msg = errMsg;
  }
  res.render("login", { title : "login", userId : "", message : msg });
});

router.get("/join", (req, res, next) => {
    var msg;
    var errMsg = req.flash("error");
    if (errMsg) {
      msg = errMsg;
    }
    res.render("join", { title : "join", message : msg });
});

router.get('/login', function(req, res, next) {
    var userId = "";

    console.log("세션 쿠키 확인:", req.session);
    
    if (!req.session?.passport) {
        userId = req.session.passport?.user;
    }
  res.render('login', { title : "login", userId: userId });

});

router.post("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) { return next(err); } 
        req.session.destroy();
        res.cookie(`connect.sid`, ``, { maxAge : 0 });
        res.redirect("/");
  });
});

router.get("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) { return next(err); } 
        req.session.destroy();
        res.cookie(`connect.sid`, ``, { maxAge : 0 });
        res.redirect("/");
    });
});

// router.get('/home', function (req, res, next) {
//     res.render('home', {"user_id" : req.user.email});
// });

router.post("/join_submit",
    [
        body("name").trim().notEmpty().isLength({min: 3, max: 10}).withMessage("이름 에러"),
        body("email").trim().notEmpty().isEmail().withMessage("이메일 형식 확인").isLength({max: 30}).withMessage("이메일 에러"),
        body("password").trim().notEmpty().isLength({min: 5, max: 30}).withMessage("비밀번호 에러"),
        (req, res, next) => {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json(error);
            }
            next();
        }
    ],
    passport.authenticate("local-join", 
        {
            successRedirect: "/home",
            failureRedirect: "/auth/join",
            failureFlash: true
}));

router.post('/login_submit',
    [
        body("email").trim().notEmpty().isEmail().withMessage("이메일 형식 확인").isLength({max: 30}).withMessage("이메일 에러"),
        body("password").trim().notEmpty().isLength({min: 5, max: 30}).withMessage("비밀번호 에러"),
        (req, res, next) => {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json(error);
            }
            next();
        }
    ], 
    passport.authenticate("local-login", { 
        successRedirect: '/home',
        failureRedirect: '/auth/login',
        failureFlash: true 
}));

return router;
}
// module.exports = router;