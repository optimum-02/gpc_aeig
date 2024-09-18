const express = require("express");
const authRouter = require("./auth_route.js");
const { UserService } = require('../services/user_service');
const { AuthService } = require('../services/auth_service');
const { UserDAO } = require('../dao/user_dao');

const apiRoutes = express.Router();
const { AuthMiddleware } = require("../middlewares/auth_middleware");
const { notFoundRoute } = require("../middlewares/error_middleware.js");
const appConfig = require("../config/app_config.js");
const userDao = new UserDAO();
const authService = new AuthService(appConfig.jwtSecret, appConfig.SALT);
const userService = new UserService({ userDao, authService });

const authMiddleware = new AuthMiddleware({authService, userService})

// Enregistrer les routes
apiRoutes.use("/api/auth", authRouter);
apiRoutes.use("/api/*", notFoundRoute);
apiRoutes.use("/*", notFoundRoute);

module.exports = apiRoutes;
