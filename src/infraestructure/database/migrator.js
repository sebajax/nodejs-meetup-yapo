// module imports
import { Umzug, SequelizeStorage } from 'umzug';
// db import
import db from './db';
// logger import
import logger from '../log/logger';

const umzug = new Umzug({
  migrations: { glob: process.env.MIGRATIONS_DIR },
  context: db.sequelize.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize: db.sequelize,
    modelName: 'migrations',
  }),
  logger,
});

export default umzug;
