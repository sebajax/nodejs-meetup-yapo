// route imports
import indexRoutes from './index.routes';
import documentationRoutes from './documentation.routes';

export default (app) => {
  app.use('/', indexRoutes);
  app.use('/', documentationRoutes);
};
