const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const { name, total_qnty, category, price } = req.body;
    const product = new Product({ name, total_qnty, category, price });
    await product.save();
    res.status(201).send('Product added successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.json(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  exports.getProductsByCategory = async (req, res) => {
    try {
      const products = await Product.find({ category: req.params.category });
      res.json(products);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  