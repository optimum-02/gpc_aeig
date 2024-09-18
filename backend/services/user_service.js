const {ValidationError, AppError} = require('../utils/app_error.js');

class UserService {
  constructor({ userDao, authService }) {
    this.userDao = userDao;
    this.authService = authService;

  }

  async signup(firstName, lastName, email, password, role) {
    const res = await this.userDao.findByEmail(email);
    if(res){
      throw new AppError("Invalid credentials", 400);
    }
    const hashedPassword = await this.authService.hashPassword(password);
    const user = await this.userDao.createUser({ firstName, lastName, email, password: hashedPassword, role });
    const token = this.authService.generateToken(user);
    delete user.password;

    return { token, user };
  }

  async login(email, password) {
    const user = await this.userDao.findByEmail(email);
    if (!user) {
      throw new ValidationError('Invalid credentials');
    }
    const isPasswordValid = await this.authService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new ValidationError('Invalid credentials');
    }
    
    const token = this.authService.generateToken(user);
    delete user.password;
    return { token, user };
  }
  async user(id) {
    const user = await this.userDao.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    delete user.password;

    return user;
  }
}

module.exports = { UserService };
