const app = require('./app');
const logger = require('./utils/logger');

const port = process.env.PORT || 4003;

const { register } = require('./metrics');

const { httpRequestsTotal } = require('./metrics');

app.listen(port, () => {
  logger.info(`Order service running on port ${port}`);
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

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