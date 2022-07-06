// module imports
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import routes from './api/routes/routes';
import logger from './infraestructure/log/logger';
import migrator from './infraestructure/database/migrator';
import { VERSION_NUMBER } from './infraestructure/config/version.config';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// set this to true to get ip address when behind a proxy
app.set('trust proxy', true);
// load - app routes
routes(app);

(async () => {
  try {
    await migrator.up();
    app.listen(process.env.PORT, () => {
      logger.info(`APP ${VERSION_NUMBER} running on PORT: ${process.env.PORT}`);
    });
  } catch (error) {
    logger.error(`server error: ${error}`);
  }
})();

export default app;
