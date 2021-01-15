const { Router } = require("express");
const { Op } = require("sequelize");
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
    order: [
      ["order", "DESC"],
      ["id", "DESC"],
    ],
    where: {
      userId: 1, // FIXME: 하드코딩
    },
  });

  res.send({ todos });
});

/**
 * Todo 추가
 */
router.post("/todos", async (req, res) => {
  const { value } = req.body;
  const userId = 1; // FIXME: 하드코딩
  const maxOrderByUserId = await Todo.max("order", {
    where: {
      userId,
    },
  });

  // NOTE: NaN과 연산하는 수식의 결과는 무조건 NaN이 나오므로 아래의 조건은 정상적으로 동작한다.
  const order = maxOrderByUserId + 1 || 1; // 최소 값은 1로 한다.
  const todo = await Todo.create({ userId, value, order });
  res.send({ todo });
});

/**
 * Todo 수정
 */
router.patch("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const { value, order, done } = req.body;
  const userId = 1; // FIXME: 하드코딩

  const currentTodo = await Todo.findByPk(todoId);
  if (!currentTodo) {
    // TODO: 에러 핸들링 필요. 프론트에서 문제 안생기게 처리하면 괜찮긴 함.
    throw new Error("존재하지 않는 todo 데이터입니다.");
  }

  if (order) {
    // 1. currentTodo.order보다 작고 바꾸려고 하는 order 값과 크거나 같은 Todo 데이터만 가져옵니다.
    const affectTodos = await Todo.findAll({
      where: {
        userId,
        [Op.or]: [
          {
            order: {
              [Op.gte]: order,
              [Op.lt]: currentTodo.order,
            },
          },
          {
            order: {
              [Op.lte]: order,
              [Op.gt]: currentTodo.order,
            },
          },
        ],
      },
    });
    // 2. 불러온 데이터의 order 필드를 1씩 늘립니다.
    await Promise.all(
      affectTodos.map((todo) => {
        if (currentTodo.order > order) {
          // down을 하는 경우 위로 밀어주기 위해 불러온 데이터들의 order를 증가시킵니다.
          return todo.increment("order", { by: 1 });
        } else if (currentTodo.order < order) {
          // up을 하는 경우 아래로 밀어주기 위해 불러온 데이터들의 order를 감소시킵니다.
          return todo.decrement("order", { by: 1 });
        }
      })
    );

    // 3. 내가 원하는 Todo 데이터의 order 값을 지정합니다.
    currentTodo.order = order;
  }

  if (value) {
    currentTodo.value = value;
  }

  // NOTE: true, false 모두 입력받을수 있다.
  if (done !== undefined) {
    currentTodo.doneAt = done ? new Date() : null;
  }
  await currentTodo.save();

  res.send({});
});

module.exports = router;
