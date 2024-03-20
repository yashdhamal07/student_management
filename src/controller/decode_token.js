const jwt = require("jsonwebtoken");

const FetchUserId = (token) => {
  const decToken = jwt.decode(token);
  return decToken?.user_id;
};

module.exports = { FetchUserId, FetchUserRole };
;
