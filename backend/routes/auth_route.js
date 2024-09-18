const express = require('express');
const { AuthController } = require('../controllers/auth_controller');
const { UserService } = require('../services/user_service');
const { AuthService } = require('../services/auth_service');
const { UserDAO } = require('../dao/user_dao');
const apiResponseFormatter  = require("../utils/api_response_formatter");
const { validateRequest } = require('../middlewares/request_validation_middleware');
const Joi = require('joi');
const appConfig = require('../config/app_config');
const { modelToEntityConverter } = require('../utils/dto');
const { AuthMiddleware } = require('../middlewares/auth_middleware');


// Dépendances
const userDao = new UserDAO(modelToEntityConverter);
const authService = new AuthService(appConfig.jwtSecret, appConfig.SALT);
const userService = new UserService({userDao,authService});
const authController = new AuthController(userService);
const authMiddleware = new AuthMiddleware({authService, userService});
const authRouter = express.Router();

const signupRequest =  Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).uppercase().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('admin', 'membre').required(),
  });

const loginRequest =  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

authRouter.post(
  '/signup',
  validateRequest({bodySchema:signupRequest}),
  apiResponseFormatter(authController.signup)
);

// Route pour la connexion (login)
authRouter.post(
  '/login',
  validateRequest({bodySchema:loginRequest}),
  apiResponseFormatter(authController.login)
);
authRouter.get(
  '/user',
  authMiddleware.authenticate,
   apiResponseFormatter(authController.user)
);

module.exports = authRouter;


