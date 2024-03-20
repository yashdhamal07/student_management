const jwt = require("jsonwebtoken");

const FetchUserId = (token) => {
  const decToken = jwt.decode(token);
  return decToken?.user_id;
};

module.exports = { FetchUserId, FetchUserRole };


// const jwt = require("jsonwebtoken");

// const FetchUserId = (token) => {
//   try {
//     const decToken = jwt.decode(token);
//     return decToken?.user_id;
//   } catch (error) {
//     console.log("Error decoding token:", error.message);
//     return null;
//   }
// };

// module.exports = { FetchUserId, FetchUserRole };
