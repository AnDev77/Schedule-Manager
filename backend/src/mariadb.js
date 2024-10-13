require('dotenv').config(); // dotenv 모듈 소환

// mysql 모듈 소환
const mariadb = require('mysql2');

// db와 연결 통로 생성
const connection = mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true,
    multipleStatements : true
});

module.exports = connection;
