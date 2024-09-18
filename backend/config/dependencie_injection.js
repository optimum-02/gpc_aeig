const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { UserService } = require('../services/user_service');
const { AuthService } = require('../services/auth_service');
const { UserDAO } = require('../dao/user_dao');
const {  AuthMiddleware } = require("../middlewares/auth_middleware");
const { notFoundRoute } = require("../middlewares/error_middleware.js");


// Crée un conteneur Awilix
const container = createContainer();

// Enregistre les services et dépendances
container.register({
  userService: asClass(UserService).singleton(),
  authService: asClass(AuthService).singleton(),
  userDAO: asClass(UserDAO).singleton(),
  authMiddleware: asClass(AuthMiddleware).singleton(),
  notFoundRoute: asFunction(notFoundRoute).singleton()
});

module.exports = container;
