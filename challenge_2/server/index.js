const express = require('express');
const app = express();
const request = require('request');

app.use(express.static('public'));

app.get('/timeframe', (req, res) => {
  request(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${req.query.start}&end=${req.query.end}`, (error, response, body) => {
    res.json(response);
  });
});

module.exports = { app };