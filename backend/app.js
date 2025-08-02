var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const investmentsRouter = require('./routes/investments');
const portfolioRouter = require('./routes/portfolio');
const transactionsRouter = require('./routes/transactions');
const adminRouter = require('./routes/admin');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/investments', investmentsRouter);
app.use('/portfolio', portfolioRouter);
app.use('/transactions', transactionsRouter);
app.use('/admin', adminRouter);

// Set default JWT secret if not in environment
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'your_jwt_secret_key_here_change_in_production';
}

console.log('Server ready - using in-memory storage');

module.exports = app;
