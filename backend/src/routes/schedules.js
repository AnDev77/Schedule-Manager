const express = require('express');
const router = express.Router();
const { 
        getSchedules,
        addSchedule,
        deletSchedule, 
        updateSchedule
        } = require('../controller/ScheduleController')


router.use(express.json());

router.get('/', getSchedules);

router.post('/', addSchedule);

router.delete('/:id', deletSchedule); 

router.put('/:id', updateSchedule)

module.exports = router