const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    const userId = req.session.userId;

    try {
        const [results] = await db.execute(
            'SELECT courses.course_code, courses.course_name, results.grade FROM results JOIN courses ON results.course_id = courses.id WHERE results.user_id = ?',
            [userId]
        );
        res.render('results', { results });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

module.exports = router;
