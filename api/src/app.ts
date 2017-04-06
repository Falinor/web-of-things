import { json, urlencoded } from 'body-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import { config } from './config/config';
import { clientError, logError, notFound } from './middlewares/index';
import { indexRoutes, userRoutes } from './models/index';

// Init application
const app: express.Express = express();

// Logger
app.use(morgan('dev'));

// Parsers
app.use(json());
app.use(urlencoded({ extended: true }));

// Security
app.use(helmet());

// Routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);

app.use(notFound());
app.use(logError());
app.use(clientError());

app.listen(config.app.port, () => {
  console.log(`Listening on ${config.app.port}`);
});

export { app };
