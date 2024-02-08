const bcrypt = require('bcryptjs');

/**
 * Encrypts a plain text password.
 * 
 * @param {string} password - The plain text password to encrypt.
 * @returns {Promise<string>} The hashed password.
 */
exports.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Compares a plain text password with a hashed password.
 * 
 * @param {string} candidatePassword - The plain text password for comparison.
 * @param {string} hashedPassword - The hashed password from the database.
 * @returns {Promise<boolean>} A boolean indicating if the passwords match.
 */
exports.comparePassword = async (candidatePassword, hashedPassword) => {
  return bcrypt.compare(candidatePassword, hashedPassword);
};
