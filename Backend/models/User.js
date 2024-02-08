const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'Username is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },
  password: { type: String, required: [true, 'Password is required'], minlength: [6, 'Password must be at least 6 characters long'] }
}, { timestamps: true });

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
