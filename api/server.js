const http = require("./app");
require("./events"); // binding

http.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});
