const express = require('express'); // express 모듈
const router = express.Router();
const {addNotification, getNotifications, updateNotification, deleteNotification} = require('../controller/NotificationController');
router.use(express.json());

router.post('/', addNotification);

router.get('/', getNotifications);

router.put('/', updateNotification);

router.delete('/', deleteNotification);

module.exports = router