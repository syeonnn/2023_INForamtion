const express = require("express");
const cors = require('cors')
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect DB
connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());

// Routes
const registerRouter = require("./routes/api/register");
const usersRouter = require("./routes/api/users");
const videoRouter = require("./routes/api/video");
const wordsRouter = require("./routes/api/words")
app.use("/api/users/register", registerRouter);
app.use("/api/users", usersRouter);
app.use('/api/video', videoRouter);
app.use("/api/words", wordsRouter);

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