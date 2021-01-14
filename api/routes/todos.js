const { Router } = require("express");
const { Todo } = require("../models");
const router = Router();

/**
 * TODO: 익스프레스4까지는 기본적으로 async handler 지원 안해서 내장 에러핸들러로 에러핸들링 안됨. -> 에러가 안나면 동작엔 문제 없음 ㅎㅎ;;
 * @see https://expressjs.com/en/guide/error-handling.html
 */

/**
 * 모든 Todo 가져오기
 */
router.get("/todos", async (req, res) => {
  const todos = await Todo.findAll({
    order: [["id", "DESC"]],
  });

  res.send({ todos });
});

/**
 * Todo 추가
 */
router.post("/todos", async (req, res) => {
  const { userId, value } = req.body;
  const todo = await Todo.create({ userId, value });
  res.send({ todo });
});

module.exports = router;
