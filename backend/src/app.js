const express = require('express');
const cors = require('cors');
const app = express();

// dotenv 모듈
const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT); // 실제 프로젝트 시 유의미한 port 번호 지정

app.use(cors({
    origin: 'http://localhost:3001', // 프론트엔드 주소
    credentials: true,
    exposedHeaders: ['Set-Cookie', 'Date', 'ETag']
}));

// 라우팅 기능
const userRouter = require('./routes/users');
const scheduleRouter = require('./routes/schedules');
const notificationRouter = require('./routes/notifications');

app.use("/users", userRouter);
app.use("/schedules", scheduleRouter);
app.use("/notifications", notificationRouter);