const jwt = require("jsonwebtoken");
const logger = require("./logger");
const config = require("./config");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }
  if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  logger.error(error.message);

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (request, _reponse, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }

  next();
};

const userExtractor = async (request, _reponse, next) => {
  const user = jwt.verify(request.token, config.SECRET);

  request.user = await User.findById(user.id);

  next();
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
};
