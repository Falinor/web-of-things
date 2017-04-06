import { json, urlencoded } from 'body-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import { config } from './config/config';
import { routes } from './routes/routes';

// Init application
const app: express.Express = express();

// Logger
app.use(morgan('dev'));

// Parsers
app.use(json());
app.use(urlencoded({ extended: true }));

// Security
app.use(helmet());

app.use(routes);

app.listen(config.app.port, () => {
  // console.log(`Listening on ${config.app.port}`);
});

export { app };
