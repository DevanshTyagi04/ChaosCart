const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');
const crypto = require('crypto');
const logger = require('./utils/logger');
const orderRoutes = require('./routes/orderRoutes');
const { httpRequestsTotal } = require('./metrics');

const app = express();

app.use(cors());
app.use(express.json());
app.use(pinoHttp({
  logger,
  genReqId: function (req) {
    return req.headers['x-request-id'] || crypto.randomUUID();
  }
}));

app.use((req, res, next) => {

  res.on('finish', () => {
    httpRequestsTotal.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode
    });
  });

  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'order-service' });
});

app.use('/api/orders', orderRoutes);

module.exports = app;
