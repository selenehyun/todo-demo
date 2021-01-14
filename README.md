# Todo App Example

## 1. run web
```
cd web
npm i
npm start
```

## 2. run api
```
cd api
npm i
npx sequelize db:create # 디비 연결 가능한 상태에서 실행 => config/config.json 수정
npx sequelize db:migrate # 디비 연결 가능한 상태에서 실행 => config/config.json 수정
npm start
```
