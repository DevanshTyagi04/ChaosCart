const pino = require('pino');

const isProduction = process.env.NODE_ENV === 'production';

const logger = pino({
  name: 'order-service',
  level: process.env.LOG_LEVEL || 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: [
    'req.headers.cookie',
    'req.headers.authorization',
    'req.headers["x-api-key"]',
    'req.headers.session',
    'req.headers.token',
    'req.headers.jwt'
  ],
  transport: isProduction
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
});

module.exports = logger;
