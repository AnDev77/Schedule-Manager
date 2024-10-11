const express = require('express');
const router = express.Router();
const { join, login, idCheck, passwordReset, userDelete } = require('../controller/UserController');
const {body, validationResult} = require('express-validator'); 
router.use(express.json());

const validate = (req, res, next) => {
    const err = validationResult(req);

    if (err.isEmpty()) {
        return next(); 
     } 
    else {
        return res.status(400).json(err.array()) 
     }

}

router.post('/join', 
    [
        body('email').notEmpty().isEmail().withMessage('이메일 형식으로 입력하세요'),
        body('password').notEmpty().isString().withMessage('비밀번호를 입력하세요'),
        validate
    ],
    join);

router.post('/login', 
    [
        body('email').notEmpty().isEmail().withMessage('이메일 형식으로 입력하세요'),
        body('password').notEmpty().isString().withMessage('비밀번호를 입력하세요'),
        validate
    ],
    login);

router.post('/idcheck',
    [
        body('email').notEmpty().isEmail().withMessage('이메일 형식으로 입력하세요'),
        validate
    ],
    idCheck);

router.put('/reset',
    [
        body('email').notEmpty().isEmail().withMessage('이메일 형식으로 입력하세요'),
        body('password').notEmpty().isString().withMessage('비밀번호를 입력하세요'),
        validate
    ],
     passwordReset);

router.delete('/delete', 
    [
        body('email').notEmpty().isEmail().withMessage('이메일 형식으로 입력하세요'),
        validate
    ],
    userDelete);

module.exports = router