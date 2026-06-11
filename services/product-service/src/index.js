const app = require('./app');
const logger = require('./utils/logger');

const port = process.env.PORT || 4002;

const { register } = require('./metrics');



app.listen(port, () => {
  logger.info(`Product service running on port ${port}`);
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

