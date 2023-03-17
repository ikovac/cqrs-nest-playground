import * as dotenv from 'dotenv';
import databaseConfig from 'config/database';

dotenv.config();

export default {
  ...databaseConfig(),
  entities: [`${__dirname}/**/models/*.ts`],
};
