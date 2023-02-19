const mongoose = require("mongoose");

// User Schema 생성
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    level: {
        type: String,
    }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;