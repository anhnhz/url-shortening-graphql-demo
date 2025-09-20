import express, { Router, json, urlencoded } from 'express';
import logger from 'morgan';
import cors from 'cors';

import graphqlMiddleware from './graphql.js';
import routes from './router.js';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/graphiql', graphqlMiddleware);

app.use('', routes(Router));
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error.status) res.status(error.status).send({ error: error.message });
  else throw error;
});

export default app;
