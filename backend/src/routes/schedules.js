const express = require('express');
const router = express.Router();
const { 
        getSchedules,
        addSchedule,
        deletSchedule, 
        updateSchedule,
        shareSchedule
        } = require('../controller/ScheduleController')


router.use(express.json());

router.get('/', getSchedules);

router.post('/', addSchedule);

router.delete('/:id', deletSchedule); 

router.put('/:id', updateSchedule);

router.post('/share/:id', shareSchedule);

module.exports = router