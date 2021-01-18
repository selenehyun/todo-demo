/**
 * Joi scheme으로 req를 validation하는 middleware factory
 * 그냥 미들웨어를 이런식으로 만들어서 사용할 수도 있다는것을 알면 됨.
 */
module.exports = (scheme) => (req, res, next) => {
  const { error } = scheme
    .options({
      allowUnknown: true,
    })
    .validate(req);
  if (error) {
    // FIXME: 개발자스러운 에러 메세지를 내뿜는다. Joi가 만들어준 에러 메세지를 그대로 보여주기 때문.
    res.status(400).send({
      errorMessage: error.message,
    });
    return;
  }
  next();
};
