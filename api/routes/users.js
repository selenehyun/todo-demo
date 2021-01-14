const { Router } = require("express");
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

  await User.create({ email, nickname, password });
  // TODO: jwt
  res.send({ token: 'FIXME: HARDCODINGTOKEN' });
});

module.exports = router;
