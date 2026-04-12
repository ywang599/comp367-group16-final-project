// completed by Yue Wang (301369283)

// use bcrypt to hash passwords
const bcrypt = require("bcryptjs");

// hash a plain password before saving
const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

// compare plain password with hashed password during login
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};