// mysql 모듈 소환
const mariadb = require('mysql2');

// db와 연결 통로 생성
const connection = mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database : 'Schedule-Manager', // db 이름, 비밀번호 등이 다르시면 수정하셔도 됩니다!
    dateStrings: true
});

module.exports = connection;