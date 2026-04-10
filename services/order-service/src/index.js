const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 4003;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'order-service' });
});

app.use('/api/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Order service running on port ${port}`);
});
