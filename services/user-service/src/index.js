const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');
const crypto = require('crypto');
const logger = require('./utils/logger');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(pinoHttp({
  logger,
  genReqId: function (req) {
    return req.headers['x-request-id'] || crypto.randomUUID();
  }
}));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'user-service' });
});

app.use('/api/users', userRoutes);

app.listen(port, () => {
  logger.info(`User service running on port ${port}`);
});
