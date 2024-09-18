const apiResponseFormatter = (fn) => {
  return (req, res, next) => {
    return Promise.resolve(fn(req))
      .then((apiResponse) => {
        const status = apiResponse.statusCode;
        const body = {
          status: status >= 400 ? "error" : "success",
          data: apiResponse.data,
          message: apiResponse.message,
        };
        return res.status(status).json(body);
      })
      .catch(next);
  };
};

module.exports = apiResponseFormatter;
