const express = require("express");

const authRoutes = require("./routes/auth");
const controlRoutes = require("./routes/subreddit");

const app = express();

app.use(express.json());

app.use("/", authRoutes);
app.use("/api", controlRoutes);

module.exports = app;
