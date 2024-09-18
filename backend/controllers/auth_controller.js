const ApiResponse = require("../utils/api_response");

class AuthController {
  constructor(userService ) {
    this.userService = userService;
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.user = this.user.bind(this)
  }

  async signup(req) {
      const { firstName, lastName, email, password, role } =req.body;
      const result = await this.userService.signup(firstName, lastName, email, password, role);
      return new ApiResponse(201, result, "User signup successfully");
  }

  async login(req) {
      const { email, password } = req.body;
      const result = await this.userService.login(email, password);
      return new ApiResponse(200, result, "User login successfully");

  }
  async user(req) {
      const result = await this.userService.user(req.user);
      return new ApiResponse(200, result, "User data retrieved successfully");

  }
}

module.exports = { AuthController };
