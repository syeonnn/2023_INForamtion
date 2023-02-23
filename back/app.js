const express = require("express");
const config = require("./config/key");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 4000;

// app.use(express.urlencoded({ extended: true}));
app.use(express.json({ extended: false })); // allow to get the data in req.body
app.use(cookieParser());
app.use(cors());

// Routes
const registerRouter = require("./routes/api/register");
app.use("/api/register", registerRouter);
app.use('/api/video', require('./routes/api/video'));

const usersRegister = require("./routes/api/users");
app.use("/api/users", usersRegister);

app.get("/", (req, res) => {
    res.send("API running...");
});

// Connect DB
connectDB();

// const mongoose = require("mongoose");
// const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});