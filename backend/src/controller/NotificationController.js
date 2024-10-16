const conn = require('../mariadb'); 
const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv');
dotenv.config();
const { transporter } = require('../email');
const cron = require('node-cron');
const moment = require('moment-timezone');

const addNotification = (req, res) => {
    const { user_id, schedule_id, notify_time } = req.body;

    // 사용자가 입력한 notify_time을 KST로 변환
    const notifyTimeKST = moment.tz(notify_time, "Asia/Seoul").format('YYYY-MM-DD HH:mm:ss');

    let query = `INSERT INTO notifications (user_id, schedule_id, notify_time) VALUES(?, ?, ?)`;
    let values = [user_id, schedule_id, notifyTimeKST];

    conn.query(query, values, (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json(err);
        }
        res.status(StatusCodes.CREATED).json({
            message: "알람이 추가되었습니다."
        });
    });
}; // 알림 추가

const getNotifications = (req, res) => {
    const { user_id } = req.body;

    let query = `SELECT notifications.*, schedules.title, schedules.start_date FROM notifications LEFT JOIN schedules ON notifications.schedule_id = schedules.id WHERE notifications.user_id = ?`;
    
    conn.query(query, [user_id], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json(err);
        }
        res.status(StatusCodes.OK).json(rows);
    });
}; // 알림 조회

const updateNotification = (req, res) => {
    const { id, notify_time } = req.body;

    let query = `UPDATE notifications SET notify_time = ? WHERE id = ?`;
    
    conn.query(query, [notify_time, id], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json(err);
        }
        if (rows.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: '알림이 없습니다.' });
        }
        res.status(StatusCodes.OK).json({
            message: "알람이 수정되었습니다."
        });
    });
}; // 알림 수정

const deleteNotification = (req, res) => {
    const { id } = req.body;

    let query = `DELETE FROM notifications WHERE id = ?`;
    
    conn.query(query, [id], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json(err);
        }
        if (rows.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: '알림이 없습니다.' });
        }
        res.status(StatusCodes.OK).json({
            message: "알람이 삭제되었습니다."
        });
    });
}; // 알림 삭제

cron.schedule('* * * * *', () => {
    console.log("돌아가는 중");

    const currentTime = moment.tz("Asia/Seoul").format();  // 현재 시간을 KST로 설정
    
    const query = `SELECT n.id, u.email, s.title, n.notify_time 
                   FROM notifications n 
                   JOIN users u ON n.user_id = u.id 
                   JOIN schedules s ON n.schedule_id = s.id
                   WHERE n.notify_time <= ?`; // 현재 시간을 쿼리의 조건으로 추가

    conn.query(query, [currentTime], (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }

        if (rows.length === 0) {
            console.log("전송할 알림이 없습니다.");
            return; // 전송할 알림이 없는 경우 종료
        }

        rows.forEach(notification => {
            const mailOptions = {
                from: process.env.SENDER,
                to: notification.email,
                subject: '일정 알림',
                text: `일정 제목: ${notification.title}\n
                        알림 시간: ${notification.notify_time}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Email sent: ${info.response}`);
                    
                    // 이메일 전송 후 알림을 삭제
                    const deleteQuery = `DELETE FROM notifications WHERE id = ?`;
                    conn.query(deleteQuery, [notification.id], (deleteErr) => {
                        if (deleteErr) {
                            console.log(deleteErr);
                        } else {
                            console.log(`Notification with id ${notification.id} deleted.`);
                        }
                    });
                }
            });
        });
    });
}); // 알림 스케줄러 (알림 시간에 맞춰 이메일 전송)

module.exports = {
    addNotification,
    getNotifications,
    updateNotification,
    deleteNotification
};
