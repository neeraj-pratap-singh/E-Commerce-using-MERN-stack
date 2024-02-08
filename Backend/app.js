const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();

// Apply security enhancements
app.use(helmet());
app.use(cors());

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(`MongoDB Connection Error: ${err.message}`));

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Not Found Route
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
