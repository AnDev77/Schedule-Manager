const connection = require('../mariadb');
const {StatusCodes} = require('http-status-codes')
const dotenv = require('dotenv')
dotenv.config();
const {transporter} = require('../email');
const sender= process.env.SENDER;

//조회 기능 (반복 일정 조회 포함)
const getSchedules = (req, res) => {
    let {calStartDate, calEndDate, user_id} = req.body;
    user_id = parseInt(user_id);

    let query1 = `SELECT DISTINCT id, title, detail, start_date, end_date, repet_type FROM schedules LEFT JOIN  scheduleMembers ON schedules.id = scheduleMembers.schedule_id 
                WHERE (schedules.user_id = ? OR scheduleMembers.user_id = ?) AND schedules.repet_type = 0 
                AND ((start_date BETWEEN STR_TO_DATE(?, '%Y-%m-%d') AND STR_TO_DATE(?, '%Y-%m-%d')) OR (end_date >= STR_TO_DATE(?, '%Y-%m-%d') AND start_date < STR_TO_DATE(?, '%Y-%m-%d')));`;
    
    let query2 = ` SELECT DISTINCT id, title, detail, start_date, end_date, repet_type FROM schedules LEFT JOIN  scheduleMembers ON 
    schedules.id = scheduleMembers.schedule_id WHERE (schedules.user_id = ? 
    OR scheduleMembers.user_id = ?) AND schedules.repet_type > 0 
    AND start_date <= STR_TO_DATE(?, '%Y-%m-%d');`;
    let result = [];
    let values = [user_id, user_id, calStartDate, calEndDate, calStartDate, calStartDate, user_id, user_id, calEndDate];
    connection.query(query1 + query2, values ,(err, rows)=>{
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        getResult(rows[0], result, calStartDate, calEndDate);
        getRepetResult(rows[1], result, calStartDate, calEndDate);
        res.status(StatusCodes.OK).json({ schedules : result});

    });    
}

//일정 추가
const addSchedule = (req, res) => { 
    const {user_id, title, detail, start_date, end_date, repet_type} = req.body;

    let query = `INSERT INTO schedules (user_id, title, detail, start_date, end_date, repet_type) VALUES(?,?,?,?,?,?)`;
    let values = [user_id, title, detail, start_date, end_date, repet_type];
    

    connection.query(query, values, (err, rows) => {
        if (err)
            return res.status(StatusCodes.BAD_REQUEST).json(err);
        res.status(StatusCodes.CREATED).json(rows);
    })
}

//일정 삭제
const deletSchedule = (req, res) =>{
    const {id} = req.params;

    const query = `DELETE FROM schedules WHERE id = ?`
    
    connection.query(query, id,  (err, rows)=>{
        if (err)
            return res.status(StatusCodes.BAD_REQUEST).end();
        if(rows.affeckedRows == 0)
            return res.status(StatusCodes.BAD_REQUEST).end();

        res.status(StatusCodes.OK).json(rows);
    })

};

//일정 업데이트
const updateSchedule = (req, res) =>{
    const {id} = req.params;
    const {start_date, end_date, start_time, end_time} = req.body;
    let values = [];
    let query = `UPDATE schedules `;
    if (start_date){
        query += `SET start_date = ? `
        values.push(start_date)
    }
    if (end_date){
        if(start_date)
            query += `, `
        query += `end_date = ?`
        values.push(end_date);
    }
    if (start_time){
        if (start_date || end_date)
            query +=   `, `
        query +=  `SET start_date = ? `
        values.push(start_time)
    }
    if (end_time){
        if (start_date || end_date || start_time)
            query += `, `
        query +=  `SET end_time = ? `
        values.push(end_time)
    }
    query += `WHERE id = ?;`
    values.push(id);
    connection.query(query, values,  (err, rows)=>{
        if (err)
            return res.status(StatusCodes.BAD_REQUEST).end();
        if(rows.affeckedRows == 0)
            return res.status(StatusCodes.BAD_REQUEST).end();

        res.status(StatusCodes.OK).json(rows);
    })

};

//비 반복일정 월 초 월 말 계산 함수
function getResult (rows, result, startDate, endDate){
    
    let S = new Date(startDate);
    let E = new Date(endDate);
    for(let i = 0; i < Object.keys(rows).length; i++){
        let tempEnd = new Date(rows[i]['end_date']);
        let tempStart = new Date(rows[i]['start_date']);
        if (tempEnd > E)
            rows[i]['end_date'] = E.toISOString().substring(0,10);
        if (tempStart < S)
            rows[i]['start_date'] = S.toISOString().substring(0,10);
        result.push(rows[i]);
    }
}

//반복일정 월초 월말 계산 및 반복 날짜 생성함수
function getRepetResult(rows, result, startDate, endDate){
    let S = new Date(startDate);
    let E = new Date(endDate);

    let diff;
    for(let i = 0; i < Object.keys(rows).length; i ++){
        let tempStart = new Date(rows[i]['start_date']);
        let tempEnd = new Date(rows[i]['end_date']);
        let repeat_type = rows[i]['repet_type'];
        
        if (repeat_type == 1){
            diff = Math.abs(tempStart.getTime() - S.getTime());
            diff = Math.ceil(diff / (1000 * 60 * 60 * 24 * 7))
            console.log(diff);    
            if (tempStart < S && tempEnd < S){
                tempStart.setDate(tempStart.getDate() + 7 * (diff-1));
                tempEnd.setDate(tempEnd.getDate() + 7 * (diff-1));
                if (tempEnd < S){
                    tempStart.setDate(tempStart.getDate() + 7 );
                    tempEnd.setDate(tempEnd.getDate() + 7 );
                }
            }
            console.log(tempStart.toISOString().substring(0, 10));
        } else{
            diff = Math.abs((S.getFullYear() - tempStart.getFullYear())*12 + (S.getMonth() - tempStart.getMonth()));
            if (tempStart < S && tempEnd < S){
                tempStart.setMonth(tempStart.getMonth() + diff);
                tempEnd.setMonth(tempEnd.getMonth() + diff);
            }
        }
            
        while (tempStart <= E){
            console.log(1);
            let getIn = new Object();
            getIn['id'] = rows[i]['id'];
            getIn['user_id'] = rows[i]['user_id'];
            getIn['team_id'] = rows[i]['team_id'];
            getIn['title'] = rows[i]['title'];
            getIn['detail'] = rows[i]['detail'];
            getIn['start_date'] = tempStart.toISOString().substring(0,10);
            getIn['end_date'] = tempEnd.toISOString().substring(0,10);
            getIn['repet_type'] = rows[i]['repet_type'];
            if(tempStart < S)
                getIn['start_date'] = S.toISOString().substring(0,10);

            if (tempEnd >= E){
                getIn['end_date'] = E.toISOString().substring(0,10);
                result.push(getIn);
                break;
            }
            result.push(getIn);
            
            if (repeat_type == 1){
                tempStart.setDate(tempStart.getDate() + 7);
                tempEnd.setDate(tempEnd.getDate() + 7);
            }
            else{
                tempStart.setMonth(tempStart.getMonth() + 1);
                tempEnd.setMonth(tempEnd.getMonth() + 1);
            }
        }
    }
}

module.exports = {  
    getSchedules,
    addSchedule,
    deletSchedule,
    updateSchedule
}

