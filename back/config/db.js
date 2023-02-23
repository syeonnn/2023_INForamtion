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
            useNewUrlParser: true,
            dbName: "2023_INF" // DB 이름을 명시하면, test DB 말고 원하는 DB로 연결
        });

        console.log("MongoDB Connected...success");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};


module.exports = connectDB;