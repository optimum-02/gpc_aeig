const { AppError } = require("../utils/app_error");

class AuthMiddleware {
  constructor({authService, userService} ) {
    this.authService = authService;
    this.userService = userService;

    this.authenticate=this.authenticate.bind(this);
  }

  async authenticate(req, res, next) {
    const error = new AppError("Missing bearer token header. Token required",401); 
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return next( error);;
    }
    const token = authHeader.split(' ')[1]; // Récupération du token après "Bearer"

    if (!token) return next( error);
    try {
      const payload =  this.authService.verifyToken(token);
      const user = await this.userService.user(payload.id);
      if (!payload || !user)  return next(error);
      req.user = user.id;
      req.email = user.email;
      next();
    } catch (e) {
      next( new AppError("Token verification failed", 401));
    }
  }
}

module.exports = { AuthMiddleware };
