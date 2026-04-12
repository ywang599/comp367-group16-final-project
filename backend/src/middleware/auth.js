// completed by Yue Wang (301369283)

const jwt = require("jsonwebtoken");

const auth = (req) => {
  const authHeader = req?.headers?.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = auth;