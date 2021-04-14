import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import graphqlMiddleware from './graphql';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/graphql', graphqlMiddleware);

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error.status) res.status(error.status).send({ error: error.message });
  else throw error;
});

export default app;
