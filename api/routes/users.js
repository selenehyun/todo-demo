const { Router } = require("express");
const { Op } = require("sequelize");
const Joi = require("joi");
const { User } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const validationMiddleware = require("../middlewares/validation-middleware");
const router = Router();

/**
 * TODO: 익스프레스4까지는 기본적으로 async handler 지원 안해서 내장 에러핸들러로 에러핸들링 안됨. -> 에러가 안나면 동작엔 문제 없음 ㅎㅎ;;
 * @see https://expressjs.com/en/guide/error-handling.html
 */

/**
 * 회원가입
 */
router.post(
  "/users",
  validationMiddleware(
    Joi.object({
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
        confirmPassword: Joi.string().min(3).required(),
        nickname: Joi.string().min(5).required(),
      }),
    })
  ),
  async (req, res) => {
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

    const user = await User.create({ email, nickname, password });
    res.send({ token: user.signToken() });
  }
);

/**
 * 토큰으로 사용자 정보를 얻어온다.
 */
router.get("/users/me", authMiddleware, async (req, res) => {
  res.send({ user: res.locals.user });
});

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
  if (!user || password !== user.password) {
    res.status(400).send({
      errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
    });
    return;
  }

  res.send({ token: user.signToken() });
});

module.exports = router;
