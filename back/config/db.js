const mongoose = require("mongoose");
const config = require("config");

// URI
const uri = config.get("mongoURI");
// const uri = config.get("mongoURI_local");

// Connect MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log("MongoDB Connected...success");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;