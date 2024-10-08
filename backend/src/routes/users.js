const express = require('express'); // express 모듈
const router = express.Router();
const {join, login, idCheck, passwordReset} = require('../controller/UserController');
router.use(express.json());

router.post('/join', join); // 회원 가입

router.post('/login', login); // 로그인

router.post('/idcheck', idCheck); // 아이디 확인

router.put('/reset', passwordReset); // 비밀번호 변경

module.exports = router