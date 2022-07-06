// module imports
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
// config imports
import { VERSION_NUMBER } from '../../infraestructure/config/version.config';

const router = express.Router();

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: VERSION_NUMBER,
      title: 'Building my first Nodejs API',
      description:
        'Yapo - Building my first Nodejs API using Yapo Node Lite Skeleton and a Serverless Architecture.',
      contact: {
        name: '$_POST[team]',
      },
      host: `localhost:5001`, // Host (optional)
      basePath: '/', // Base path (optional)
    },
    tags: [
      {
        name: 'nodejs-meetup-yapo',
        description:
          'Building my first Nodejs API using Yapo Node Lite Skeleton and a Serverless Architecture',
      },
    ],
  },
  // Paths to files containing OpenAPI definitions
  apis: ['./src/api/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;
