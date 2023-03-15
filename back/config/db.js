const mongoose = require("mongoose");
const config = require("config");

mongoose.set('strictQuery', true);

// URI
//  const uri = config.get("mongoURI");
const uri = config.get("mongoURI_local");
// const uri = config.get("mongoStartbucks"); // 스타벅스에서 테스트할 경우

// Connect MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            dbName: "2023_INF" // DB 이름을 명시하면, 원하는 DB로 연결 가능
        });

        console.log("MongoDB Connected...success");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};


module.exports = connectDB;