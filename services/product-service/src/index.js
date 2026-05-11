const app = require('./app');
const logger = require('./utils/logger');

const port = process.env.PORT || 4002;

app.listen(port, () => {
  logger.info(`Product service running on port ${port}`);
});
