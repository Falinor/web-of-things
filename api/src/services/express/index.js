import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { errorHandler as queryErrorHandler } from 'querymen';
import { errorHandler as bodyErrorHandler } from 'bodymen';

import { validationError } from '../mongoose';
import config from '../../config';

export default (routes) => {
  const app = express();

  /* istanbul ignore next */
  if (config.env === 'production' || config.env === 'development') {
    app.use(cors());
    app.use(compression());
    app.use(morgan('dev'));
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(routes);
  app.use(queryErrorHandler());
  app.use(bodyErrorHandler());

  // Mongoose error handlers
  app.use(validationError());

  return app;
};
