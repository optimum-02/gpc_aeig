const ApiResponse = require("../utils/api_response");
const appConfig = require("../config/app_config");

const errorMiddleware= (err, req, res, next)=> {
  let statusCode = err.statusCode || 500;
  const message = err.message || "Unexpected server error occured";

  if (err.name === "ValidationError") {
    statusCode=400;
  }
  const finalMessage  =   typeof err.messageData === 'object' ? err.messageData :  message;
  
  return res.status(statusCode).json({
    status : "error",
    data : null,
    message : finalMessage,
    ...(appConfig.env === "dev" && { stack: err.stack }),
  });
}

const notFoundRoute = (req, res, next) => {
  res.status(404).json({message : "Ressource not found or method not allowed"})
};

module.exports = { notFoundRoute, errorMiddleware };
