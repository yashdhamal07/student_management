const jwt = require("jsonwebtoken");

const FetchUserId = (token) => {
  const decToken = jwt.decode(token);
  return decToken?.user_id;
};

const FetchUserRole = (token) => {
  const decToken = jwt.decode(token);
  return decToken?.role;
};

module.exports = { FetchUserId, FetchUserRole };
