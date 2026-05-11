const app = require('./app');
const logger = require('./utils/logger');

const port = process.env.PORT || 4001;

app.listen(port, () => {
  logger.info(`User service running on port ${port}`);
});
