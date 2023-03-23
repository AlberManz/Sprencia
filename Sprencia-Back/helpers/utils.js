const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

// Creación del token
const createToken = (user) => {
  const obj = {
    user_id: user.id,
    user_role: user.role,
    exp: dayjs().add(1, 'weeks').unix(),
  };

  return jwt.sign(obj, process.env.SECRET_KEY);
}

module.exports = { createToken };