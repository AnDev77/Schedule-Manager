const conn = require('../mariadb'); 
const { StatusCodes } = require('http-status-codes'); 

const join = function(req, res) {
    res.status(StatusCodes.OK).send("회원가입"); 
};

const login = function(req, res) {
    res.status(StatusCodes.OK).send("로그인"); 
};

const idCheck = function(req, res) {
    res.status(StatusCodes.OK).send("아이디 확인"); 
};

const passwordReset = function(req, res) {
    res.status(StatusCodes.OK).send("비밀번호 변경"); 
};

module.exports = {
    join, 
    login, 
    idCheck, 
    passwordReset 
};
