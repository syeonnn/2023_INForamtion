const express = require("express");
const cors = require('cors')
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const config = require("./config/key");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect DB
connectDB();

// middlewares
// app.use(express.urlencoded({ extended: true}));
app.use(express.json({ extended: false })); // allow to get the data in req.body
app.use(cookieParser());
app.use(cors());

// Routes
const registerRouter = require("./routes/api/register");
const usersRouter = require("./routes/api/users");
const videoRouter = require("./routes/api/video");
app.use("/api/register", registerRouter);
app.use("/api/users", usersRouter);
app.use('/api/video', videoRouter);

app.use("/api/resoruce", express.static("assets"));

app.get("/", (req, res) => {
    res.send("API running...");
});

app.get("*", (req, res) => {
    // Set static folder
    app.use(express.static("front/public"));
    // index.html for all page routes
    res.sendFile(path.resolve(__dirname, "../front", "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});