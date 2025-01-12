const jwt = require("jsonwebtoken");
const getSecretKey = require("./getSecretKey");

function createToken(user) {
    const payload = {
      id: user._id,
      username: user.username,
      password: user.password,
      roleId: user.roleId,
    };
    const token = jwt.sign(payload, getSecretKey());
  
    return token;
  }
  
  module.exports = createToken;
  