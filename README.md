# Todo App Example

## 1. run web
```
cd web
npm i
npm start
```

서버 띄우기 귀찮으면 https://todo-demo-scc.surge.sh/ 사용해도 됨.
그러나 위 주소도 `http://localhost:8080` 에서 제공하는 API를 호출하기 때문에 API 서버는 로컬에서 무조건 띄우고 접속해야함.

## 2. run api
```
docker run --rm -p 3306:3306 --name test-db -e MYSQL_ROOT_PASSWORD=1234 mysql:5.7 mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci # 로컬에 db 띄움
cd api
npm i
npx sequelize db:create # 디비 연결 가능한 상태에서 실행 => config/config.json 수정
npx sequelize db:migrate # 디비 연결 가능한 상태에서 실행 => config/config.json 수정
npm start
```
