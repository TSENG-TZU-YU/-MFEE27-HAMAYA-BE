const express = require('express');
const router = express.Router();
const pool = require('../utils/db');

router.put('/rent', async (req, res, next) => {
    console.log('123', req.body);
    try {
        const renterros = {};
        if (req.body.fullName === '') {
            renterros.fullName = '請填入姓名';
        }
        if (req.body.date === '') {
            renterros.date = '請選擇日期';
        }
        if (req.body.phone === '') {
            renterros.phone = '請填入連絡電話';
        }
        if (req.body.time === '') {
            renterros.time = '請選擇時間';
        }
        if (req.body.email === '') {
            renterros.email = '請輸入信箱';
        }
        if (req.body.usercount == '0') {
            renterros.usercount = '請選擇人數';
        }
        if (req.body.item == '0') {
            renterros.item = '請選擇場地';
        }
        console.log('erromessage', Object.keys(renterros).length);

        if (Object.keys(renterros).length != 0) {
            console.log('date', req.body.date);
            res.status(401).json(renterros);
            return;
        }

        await pool.execute('INSERT INTO venue_reservation (name, user_id, email, phone, usedate, item, comment, usercount) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', [
            req.body.fullName,
            req.body.user_id,
            req.body.email,
            req.body.phone,
            req.body.usedate,
            req.body.item,
            req.body.comment,
            req.body.usercount,
        ]);
        res.json({ message: 'ok' });
    } catch (err) {
        console.log();
    }
});

module.exports = router;
