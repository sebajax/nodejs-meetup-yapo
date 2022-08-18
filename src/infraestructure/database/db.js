// module imports
import { Sequelize, DataTypes, Op } from 'sequelize';
// logger import
import logger from '../log/logger';

/**
 * create a connection to the database
 */
const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    logging: (msg) => logger.debug(msg),
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: parseInt(process.env.DB_POOL_MAX, 10) || 5,
      min: parseInt(process.env.DB_POOL_MIN, 10) || 0,
      acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10) || 30000,
      idle: parseInt(process.env.DB_POOL_IDLE, 10) || 10000,
    },
  },
);

(async () => {
  try {
    await sequelize.authenticate();
    logger.info('connection to database has been established successfully.');
  } catch (err) {
    logger.error(`unable to connect to the database: ${err}`);
  }
})();

export default Object.freeze({
  sequelize,
  DataTypes,
  Op,
});
