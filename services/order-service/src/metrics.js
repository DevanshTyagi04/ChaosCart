const client = require('prom-client');

const register = new client.Registry();

client.collectDefaultMetrics({
    register
});

const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total HTTP requests',
    labelNames: ['method', 'route', 'status']
});

register.registerMetric(httpRequestsTotal);

module.exports = {
    register,
    httpRequestsTotal
};