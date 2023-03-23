const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dayjs = require('dayjs');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Config logs
app.use((req, res, next) => {
  const currentDate = dayjs().format('DD-MM-YYYY hh:mm:ss');

  const line = `[${currentDate}] Método: ${req.method}. Url: ${req.url}\n`;

  fs.appendFile('./logs/main.log', line, (err) => {
    if (err) {
      return res.send(err.message);
    }
    next();
  });
});

// Gestión de rutas
app.use('/api', require('./routes/api'));

module.exports = app;
