const { Router } = require("express");
const { Op } = require("sequelize");
const { User } = require("../models");
const router = Router();

/**
 * TODO: 익스프레스4까지는 기본적으로 async handler 지원 안해서 내장 에러핸들러로 에러핸들링 안됨. -> 에러가 안나면 동작엔 문제 없음 ㅎㅎ;;
 * @see https://expressjs.com/en/guide/error-handling.html
 */

/**
 * 회원가입
 * TODO: joi
 */
router.post("/users", async (req, res) => {
  const { email, nickname, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).send({
      errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
    });
    return;
  }

  // email or nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
  const existsUsers = await User.findAll({
    where: {
      [Op.or]: [{ email }, { nickname }],
    },
  });
  if (existsUsers.length) {
    res.status(400).send({
      errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
    });
    return;
  }

  await User.create({ email, nickname, password });
  // TODO: jwt
  res.send({ token: "FIXME: HARDCODINGTOKEN" });
});

module.exports = router;
