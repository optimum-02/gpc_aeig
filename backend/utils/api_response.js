/**
 * @class ApiResponse
 * @description Représente une réponse API standardisée.
 * 
 * @param {number} [statusCode=200] - Le code de statut HTTP (ex : 200, 400, 500).
 * @param {any} [data=null] - Les données retournées par l'API. Null si le statut indique une erreur (>= 400).
 * @param {string} [message=null] - Message d'erreur ou de succès basé sur le code de statut.
 * @constructor
 */
class ApiResponse {
  constructor(statusCode = 200, data = null, message = null) {
    /**
     * @type {number}
     * @description Le code de statut HTTP.
     */
    this.statusCode = statusCode;

    /**
     * @type {any}
     * @description Les données retournées par l'API.
     */
    this.data = data;

    /**
     * @type {string}
     * @description Message d'erreur ou de succès basé sur le code de statut.
     */
    this.message =
      message ||
      (statusCode >= 400
        ? "An unexpected error occurred"
        : "Request successfully proceed");
  }

  /**
   * Retourne un objet JSON représentant la réponse API.
   *
   * @returns {Object} - L'objet de réponse contenant `statusCode`, `data`, et `message`.
   */
  toJSON() {
    return {
      statusCode: this.statusCode,
      data: this.data,
      message: this.message,
    };
  }
}

module.exports = ApiResponse;
