const app = require('./app');
const logger = require('./utils/logger');

const port = process.env.PORT || 4003;

app.listen(port, () => {
  logger.info(`Order service running on port ${port}`);
});
