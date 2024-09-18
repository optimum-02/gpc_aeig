const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/app_error');

class AuthService {
  constructor(secretKey, salt) {
    this.secretKey = secretKey;
    this.salt =salt;
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  generateToken(user) {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, this.secretKey);
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (err) {
      throw new AppError('Invalid or expired token', 401);
    }
  }
}

module.exports = { AuthService };
