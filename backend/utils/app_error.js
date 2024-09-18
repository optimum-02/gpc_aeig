/**
 * AppError - Erreur personnalisée pour l'application.
 *
 * @param {String} message - Le message d'erreur à afficher.
 * @param {number} statusCode - le code http corresponndant.
 * @constructor
 */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Indique que l'erreur est gérée
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * ValidationError - Erreur personnalisée pour la validation.
 *
 * @param {String} message - Le message d'erreur à afficher.
 * @constructor
 */
// Classe d'erreur de validation personnalisée
class ValidationError extends Error {
  constructor(message) {
    super(typeof message === "object" ? JSON.stringify(message) : message);
    this.name = "ValidationError";
    this.statusCode = 400;
    this.messageData = message; // Stocker l'original pour une utilisation ultérieure
  }
}

module.exports = { AppError, ValidationError };
