const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');
const crypto = require('crypto');
const logger = require('./utils/logger');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());
app.use(pinoHttp({
  logger,
  genReqId: function (req) {
    return req.headers['x-request-id'] || crypto.randomUUID();
  }
}));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'product-service' });
});

app.use('/api/products', productRoutes);

app.listen(port, () => {
  logger.info(`Product service running on port ${port}`);
});
