const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("http");
const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");

const app = express();
const http = Server(app);

const apiRouter = express.Router();
apiRouter.use(cors());
apiRouter.use(bodyParser.json());
apiRouter.use("/api", [todosRouter, usersRouter]);

const staticRouter = express.Router();
staticRouter.use(express.static("./assets"));

app.use(apiRouter);
app.use(staticRouter);

module.exports = http;
