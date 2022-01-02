const express = require("express");

const app = express();
require("dotenv").config();
const PORT = 3001;

const authRoutes = require("./routes/auth");
const controlRoutes = require("./routes/subreddit");

app.use("/", authRoutes);
app.use("/api", controlRoutes);

app.listen(PORT, () => console.log(`Server listening on Port: ${PORT}`));
