const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const header = req?.headers["authorization"];

    if (!header) {
      return res.status(401).json({ msg: "Token not found" });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    jwt.verify(token, process.env.SECRETE, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Invalid Token" });
      }

      req.decodedToken = decoded;
      next();
    });
  } catch (error) {
    console.error(error.message);
   return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = verifyToken;
