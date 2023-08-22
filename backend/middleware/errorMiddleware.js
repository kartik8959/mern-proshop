const notFound = (req, resp, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  resp.status(404);
  next(error);
};

const errorHandler = (err, req, resp, next) => {
  let statusCode = resp.statusCode === 200 ? 500 : resp.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  resp.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
