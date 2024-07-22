const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    const userId = req.session.userId;

    try {
        const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
        if (user.length > 0) {
            res.render('profile', { user: user[0] });
        } else {
            res.redirect('/dashboard');
        }
    } catch (err) {
        console.error(err);
        res.redirect('/dashboard');
    }
});

router.post('/update', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    const userId = req.session.userId;
    const { username, email } = req.body;

    try {
        await db.execute('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, userId]);
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.redirect('/profile');
    }
});

module.exports = router;
