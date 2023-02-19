const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json({ extended: false })); // allow to get the data in req.body
app.use(cors());

// Routes
const registerRouter = require("./routes/api/register");
app.use("/api/register", registerRouter);

app.get("/", (req, res) => {
    res.send("API running...");
});

// Connect DB
connectDB();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});