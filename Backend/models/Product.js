const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Product name is required'] },
  total_qnty: { type: Number, required: [true, 'Total quantity is required'], min: [0, 'Total quantity cannot be negative'] },
  category: { type: String, required: [true, 'Category is required'] },
  price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price cannot be negative'] }
}, { timestamps: true });

productSchema.pre('save', function(next) {
  // Additional pre-save checks or modifications can go here
  next();
});

productSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Duplicate error occurred'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('Product', productSchema);
