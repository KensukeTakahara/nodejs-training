const httpStatus = require("http-status-codes");

exports.pageNotFoundError = (req, res) => {
  res.status(httpStatus.NOT_FOUND);
  res.render("error");
};

exports.internalServerError = (error, req, res, next) => {
  console.warn(`error:${error.stack}`);
  res.status(httpStatus.INTERNAL_SERVER_ERROR);
  res.send(
    `${httpStatus.INTERNAL_SERVER_ERROR} | Sorry, our application is taking a nap.`
  );
};
