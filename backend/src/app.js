// express 모듈
const express = require('express');
const app = express();

// dotenv 모듈
const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT); // 실제 프로젝트 시 유의미한 port 번호 지정

// 라우팅 기능
const userRouter = require('./routes/users');
const teamRouter = require('./routes/teams');
const team_memberRouter = require('./routes/team_members');
const scheduleRouter = require('./routes/schedules');
const notificationRouter = require('./routes/notifications');

app.use("/users", userRouter);
app.use("/teams", teamRouter);
app.use("/team_members", team_memberRouter);
app.use("/schedules", scheduleRouter);
app.use("/notifications", notificationRouter);