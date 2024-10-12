const express = require('express');
const router = express.Router();
const { 
        getSchedules,
        addSchedule,
        deletSchedule, 
        } = require('../controller/ScheduleController')


router.use(express.json());

router.get('/', getSchedules);

router.post('/', addSchedule);

router.delete('/:id', deletSchedule); 

module.exports = router