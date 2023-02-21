const express = require("express");
const config = require("./config/key");
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json({ extended: false })); // allow to get the data in req.body
app.use(cors());

// 내가 지정한 mongoDB로 연결하기 위해 추가한 코드
const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// Routes
const registerRouter = require("./routes/api/register");
app.use("/api/register", registerRouter);
app.use('/api/video', require('./routes/api/video'));

app.get("/", (req, res) => {
    res.send("API running...");
});

// Connect DB
//connectDB();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});