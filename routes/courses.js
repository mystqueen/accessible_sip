const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    try {
        const [courses] = await db.execute('SELECT * FROM courses');
        res.render('courses', { courses });
    } catch (err) {
        console.error(err);
        res.redirect('/dashboard');
    }
});

module.exports = router;
