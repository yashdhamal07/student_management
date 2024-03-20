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


// const jwt = require("jsonwebtoken");

// const generateAccessToken = (userId) => {
//   return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' }); // Access token expires in 15 minutes
// };

// const generateRefreshToken = (userId) => {
//   return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); // Refresh token expires in 7 days
// };

// const verifyToken = (req, res, next) => {
//   try {
//     const header = req?.headers["authorization"];

//     if (!header) {
//       return res.status(401).json({ msg: "Token not found" });
//     }

//     const token = header.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ msg: "Invalid Token" });
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         // Token is expired or invalid
//         if (err.name === "TokenExpiredError") {
//           // Attempt to refresh the token
//           const refreshToken = req.cookies["refreshToken"];

//           if (!refreshToken) {
//             return res.status(401).json({ msg: "No refresh token provided" });
//           }

//           jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//             if (err) {
//               return res.status(403).json({ msg: "Invalid refresh token" });
//             }

//             // Generate new access and refresh tokens
//             const accessToken = generateAccessToken(decoded.userId);
//             const newRefreshToken = generateRefreshToken(decoded.userId);

//             // Set the new tokens in response headers
//             res.set("accessToken", accessToken);
//             res.set("refreshToken", newRefreshToken);

//             // Proceed to the next middleware
//             req.decodedToken = decoded;
//             next();
//           });
//         } else {
//           return res.status(401).json({ msg: "Invalid Token" });
//         }
//       } else {
//         // Token is valid
//         req.decodedToken = decoded;
//         next();
//       }
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ msg: "Server Error" });
//   }
// };

// module.exports = { verifyToken };
