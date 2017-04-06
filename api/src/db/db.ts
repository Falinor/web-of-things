import * as Bluebird from 'bluebird';
import * as mongoose from 'mongoose';

import { config } from '../config/config';

(mongoose as any).Promise = Bluebird;
mongoose.connect(config.db.uri);

export { mongoose };
