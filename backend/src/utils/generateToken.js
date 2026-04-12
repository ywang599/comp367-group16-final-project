// completed by Yue Wang (301369283)

// use JWT authentication
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10s",
    }
  );
};

module.exports = generateToken;