const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const coursesRoutes = require('./routes/courses');
const resultsRoutes = require('./routes/results');
const profileRoutes = require('./routes/profile');

app.use(authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/courses', coursesRoutes);
app.use('/results', resultsRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
