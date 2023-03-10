const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALTROUNDS = 10;
const TOKENKEY = "secretToken";

// User Schema 생성
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: String,
    },
    level: {
        type: String,
    }
});

// 사용자 저장 전 비밀번호 암호화
UserSchema.pre("save", function (next) {
    const user=this;

    if(user.isModified("password")){
        bcrypt.genSalt(SALTROUNDS, (err, salt) => {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err);
                user.password=hash;
                next();
            });
        });
    } else next();
});

UserSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, (err, isMath) => {

        console.log("plainPassword: ",plainPassword);
        console.log("this.password", this.password);

        if (err) return cb(err);
        cb(null, isMath);
    });
}

UserSchema.methods.generateToken = function (cb) {
    const user = this;
    const token = jwt.sign(
        user._id.toHexString(), // token으로 변환할 데이터
        TOKENKEY, // secret key 값
        // { expiresIn: "1h" }, // token 유효시간
    ); 
    
    user.token = token;
    user.save((err, user) => {
        if (err) return cb(err);
        cb(null, user);
    });
}

UserSchema.statics.findByToken = function (token, cb) {
    const user = this;
    jwt.verify(token, TOKENKEY, (err, decoded) => {
        user.findOne({"_id": decoded, "token": token}, (err, user) => {
            if (err) return cb(err);
            cb(null, user);
        })
    });
}

const User = mongoose.model("user", UserSchema);
module.exports = { User };