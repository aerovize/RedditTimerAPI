const express = require("express");

const authRoutes = require("./routes/auth.routes");
const controlRoutes = require("./routes/subreddit.routes");

const app = express();

app.use(express.json());

app.use(authRoutes);
app.use("/api", controlRoutes);

module.exports = app;
