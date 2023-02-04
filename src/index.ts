import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import path from 'node:path';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';

import { corsOptions, connectDB } from './configs';
import { logEvents } from './utils';
import swaggerFile from './swagger.json';

import { errorHandler, logger } from './middlewares';

import { router } from './routes';

const app = express();

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/', express.static(path.resolve(__dirname, '..', 'public')));

app.get('^/$|/index(.html)?', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.all('*', (request, response) => {
  response.status(404);

  if (request.accepts('html')) {
    response.sendFile(path.resolve(__dirname, 'views', '404.html'));
  } else if (request.accepts('json')) {
    response.json({ message: '404 Not Found' });
  } else {
    response.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connect to MongoDB 🍃');
});

mongoose.connection.on('error', (error) => {
  logEvents(
    `${error.name}: ${error.message}\t ${error.code ?? 500}`,
    'mongoErrorLog.log'
  );
});

export { app };
