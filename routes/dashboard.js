const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    try {
        const [courses] = await db.execute('SELECT * FROM courses');
        res.render('dashboard', { courses });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

router.post('/register_course', async (req, res) => {
    const userId = req.session.userId;
    const courseId = req.body.courseId;

    try {
        await db.execute('INSERT INTO registrations (user_id, course_id) VALUES (?, ?)', [userId, courseId]);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.redirect('/dashboard');
    }
});

module.exports = router;
