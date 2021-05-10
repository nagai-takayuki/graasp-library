import { CLIENT_ERROR_MESSAGE } from './client/config/constants';

export const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

export const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: CLIENT_ERROR_MESSAGE });
  } else {
    next(err);
  }
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  res.status(500);
};
