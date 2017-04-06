import * as mongoose from 'mongoose';

import { config } from '../config/config';

(mongoose as any).Promise = global.Promise;
mongoose.connect(config.db.uri);

export { mongoose };
