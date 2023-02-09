var express = require("express");
var session = require("express-session");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require("connect-flash");

var app = express();
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: "keyboard cat", // 세션을 암호화해 저장
    resave: false, // 세션이 변경되지 않아도 덮어쓰기 허용 여부
    saveUninitialized: true // 세션 초기값이 지정되지 않은 상태에서 미리 만들어 저장할지
}));

// Routes
var videoRouter = require("./routes/video");
app.use("/video", videoRouter);

var userRouter = require("./routes/auth")(app);
app.use("/auth", userRouter);

app.get("/", (req, res, next) => {
    var userId = "";
    var msg;
    var errMsg = req.flash("error");
    if (errMsg) {
        msg = errMsg;
    }

    console.log("세션 쿠키 확인:", req.session);

    if (!req.session?.passport) {
        userId = req.session.passport?.user;
    }
    res.render("login", { title : "login", userId : userId, message : msg });
});

app.get('/home', function (req, res, next) {
    res.render('home', {"user_id" : req?.user?.name});
    // res.render('home', {"user_id" : req.session.passport.user});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

