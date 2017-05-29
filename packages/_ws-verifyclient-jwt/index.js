const jwt = require('jsonwebtoken');

module.exports = ({ jwtSecret }) => (info, callback) => {
  try {
    const authorization = info.req.headers.authorization;
    if (!authorization) {
      throw new Error('Missing authorization header');
    }
    const [scheme, token] = authorization.split(' ');
    if (scheme !== 'Bearer') {
      throw new Error('Invalid scheme in authorization header, supported: Bearer');
    }
    if (!token) {
      throw new Error('Missing token in authorization header');
    }
    try {
      info.req.user = require('jsonwebtoken').verify(token, jwtSecret);
      callback(true);
    } catch (e) {
      throw new Error('Invalid token in authorization header');
    }
  } catch (e) {
    callback(false, 401, `Unauthorized - ${e.message}`);
  }
};
