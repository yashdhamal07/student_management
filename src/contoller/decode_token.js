// const jwt = require("jsonwebtoken");

// const FetchUserId = (token) => {
//   const decToken = jwt.decode(token);
//   return decToken?.user_id;
// };

// const FetchUserRole = (token) => {
//   const decToken = jwt.decode(token);
//   return decToken?.role;
// };

// module.exports = { FetchUserId, FetchUserRole };


const jwt = require("jsonwebtoken");

const FetchUserId = (token) => {
  try {
    const decToken = jwt.decode(token);
    return decToken?.user_id;
  } catch (error) {
    console.log("Error decoding token:", error.message);
    return null;
  }
};

const FetchUserRole = (token) => {
  try {
    const decToken = jwt.decode(token);
    return decToken?.role;
  } catch (error) {
    console.log("Error decoding token:", error.message);
    return null;
  }
};

module.exports = { FetchUserId, FetchUserRole };
