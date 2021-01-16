const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", [todosRouter, usersRouter]);

app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});
