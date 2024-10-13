const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const join = function (req, res) {
    const { email, password } = req.body

    let sql = `INSERT INTO users (email, password) VALUES (?, ?)`
    let values = [email, password];

    conn.query(sql, values,
        function (err, results) {
            if (err) {
                console.log(err)
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.CREATED).json(results);
        }
    );
};

const login = function (req, res) {
    const { email, password } = req.body
    let sql = `SELECT * FROM users WHERE email = ?`

    conn.query(sql, email,
        function (err, results) {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            const loginUser = results[0];

            if (loginUser && password == loginUser.password) {
                const token = jwt.sign({
                    id: loginUser.id,
                    email: loginUser.email,
                }, process.env.PRIVATE_KEY, {
                    expiresIn: '5m',
                    issuer: 'root'
                });

                res.cookie("token", token);
                console.log(token);

                return res.status(StatusCodes.OK).json(results);
            } else {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "로그인 실패"
                }).end();
            }
        }
    );
};

const idCheck = function (req, res) {
    const { email } = req.body;
    let sql = `SELECT * FROM users WHERE email = ?`;

    conn.query(sql, email,
        function (err, results) {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            const user = results[0];
            if (user) {
                return res.status(StatusCodes.OK).json({
                    email: email
                });
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).end();
            }
        }
    )
};

const passwordReset = function (req, res) {
    const { email, password } = req.body;

    let sql = `UPDATE users SET password = ?
                WHERE email = ?`;

    let values = [password, email];

    conn.query(sql, values,
        function (err, results) {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            } else if (results.affectedRows === 0) { // email, password가 없는 경우
                return res.status(StatusCodes.BAD_REQUEST).end();
            } else {
                return res.status(StatusCodes.OK).json(results);
            }
        }
    )
};

const userDelete = function (req, res) {
    let { email } = req.body
    let sql = `DELETE FROM users WHERE email = ?`

    conn.query(sql, email,
        function (err, results) {
            if (err) {
                console.log(err)
                return res.status(400).end();
            } else if (results.affectedRows == 0) {
                return res.status(400).end();
            } else {
                res.status(200).json(results)
            }
        }
    );
}

module.exports = {
    join,
    login,
    idCheck,
    passwordReset,
    userDelete
};
