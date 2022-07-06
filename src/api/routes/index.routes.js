// module imports
import express from 'express';
import {
  HealthChecker,
  LivenessEndpoint,
  ReadinessEndpoint,
  HealthEndpoint,
} from '@cloudnative/health-connect';
// config imports
import { VERSION_NUMBER } from '../../infraestructure/config/version.config';
// middleware imports
import checkBodyMiddleware from '../middlewares/checkBody.middleware';
// controller imports
import { newCustomerController } from '../../controllers';

const router = express.Router();
const healthCheck = new HealthChecker();

/**
 * @swagger
 * /:
 *  get:
 *    tags: [
 *      "nodejs-meetup-yapo"
 *    ]
 *    description: Get the api health
 *    parameters:
 *    responses:
 *      '200':
 *        description: Returns that api is healthy
 */
router.get('/', (_req, res) => {
  return res.send(
    `API => [${process.env.API_NAME} ${VERSION_NUMBER}] ENV => (${process.env.NODE_ENV}) STATUS => OK`,
  );
});

/**
 * @swagger
 * /live:
 *  get:
 *    tags: [
 *      "nodejs-meetup-yapo"
 *    ]
 *    description: Register your Liveness endpoint
 *    parameters:
 *    responses:
 *      '200':
 *        description: Returns Liveness
 */
router.get('/live', LivenessEndpoint(healthCheck));

/**
 * @swagger
 * /ready:
 *  get:
 *    tags: [
 *      "nodejs-meetup-yapo"
 *    ]
 *    description: Register a readiness endpoint
 *    parameters:
 *    responses:
 *      '200':
 *        description: Returns Readiness
 */
router.get('/ready', ReadinessEndpoint(healthCheck));

/**
 * @swagger
 * /health:
 *  get:
 *    tags: [
 *      "nodejs-meetup-yapo"
 *    ]
 *    description: Register a combined health endpoint
 *    parameters:
 *    responses:
 *      '200':
 *        description: Returns Health
 */
router.get('/health', HealthEndpoint(healthCheck));

/**
 * @swagger
 * /new:
 *  post:
 *    tags: [
 *      "nodejs-meetup-yapo"
 *    ]
 *    description: Creates a new customer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                required: true
 *              identityNumber:
 *                type: string
 *                required: true
 *              email:
 *                type: string
 *                required: true
 *              phone:
 *                type: string
 *                required: true
 *              address:
 *                type: string
 *                required: true
 *    responses:
 *      '201':
 *        description: Returns the created customer id
 */
router.post('/new', checkBodyMiddleware, newCustomerController);

export default router;
