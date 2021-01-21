const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("http");
const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");

const app = express();
const http = Server(app);

app.use(cors());
app.use(bodyParser.json());
app.use("/api", [todosRouter, usersRouter]);

module.exports = http;
