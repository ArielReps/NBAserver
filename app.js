const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const playersRoute = require("./Routes/playersRoute")
const app = express();

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: "*",
    credentials: true,
};
app.use(cors(corsOptions));
app.use("/api",playersRoute)
module.exports = app;