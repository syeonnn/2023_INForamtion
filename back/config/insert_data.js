const mongoose = require("mongoose");
const config = require("../config/default.json");

mongoose.set('strictQuery', true);

// console.log(config);

// URI
const uri = config["mongoURI"];
// const uri = config["mongoURI_local"];
// const uri = config["mongoStartbucks"];

// Connect MongoDB
async () => {
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


// Insert Data
// 미리 json 파일로 만들어둔 데이터 리스트를 mongo db atlas에 업로드
const src = require("../assets/word/words.json");


var data = JSON.parse(JSON.stringify(src));

// 업로드할 Model
const { DataModel } = require("../models/Word");


for (var i=0;i < data.length; i++) {
    console.log(data[i])

    const tmp = DataModel.create

    const newData = new DataModel(data[i]);
    

    newData.save()
        .then(() => {
            console.log(`${i} insert success!`);
        })
        .catch(err => {
            console.error(err);
        });
    
        break;
}