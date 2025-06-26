const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests
  })
);

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/roles', require('./src/routes/roles'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/enterprises', require('./src/routes/enterprises'));
app.use('/api/employees', require('./src/routes/employees'));
app.use('/api/products', require('./src/routes/products'));
app.use('/api/dashboards', require('./src/routes/dashboards'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));