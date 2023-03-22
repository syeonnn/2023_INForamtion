const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    studyList: {
        type: Array,
    },
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }   
});


userSchema.pre("save", function (next) {
    const user=this;

    if(user.isModified("password")){
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if(err) return next(err);
                user.password=hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, (err, isMath) => {

        // console.log("plainPassword: ",plainPassword);
        // console.log("this.password", this.password);

        if (err) return cb(err);
        cb(null, isMath);
    });
}


userSchema.methods.generateToken = function (cb) {
    const user = this;
    var token = jwt.sign(
        user._id.toHexString(),
        'secret'
    ); 
    var oneHour = moment().add(1, 'hour').valueOf();
    
    user.tokenExp = oneHour;
    user.token = token;
    // user.save((err, user) => {
    //     if (err) return cb(err);
    //     cb(null, user);
    // });
    user.save()
        .then((user) => {
            cb(null, user);
        }).catch((err) => {
            cb(err);
        });
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret', function (err, decode) {
        user.findOne({"_id":decode, "token":token})
            .then((user) => {
                console.log("findBytoken 함수 실행, ", user);
                cb(null, user);
            }).catch((err) => {
                console.log("findBytoken 함수 실행, ", err);
                cb(err);
            });
    });
};

const User = mongoose.model('User', userSchema);

module.exports = { User }