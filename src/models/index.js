/* eslint-disable no-console */
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

import env from '../env.js';
import urlSchema from './url.js';

const models = {
  Url: model('URL', urlSchema(Schema)),
};

mongoose.connect(env.databaseURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

const db = mongoose.connection;

const databaseSetup = () => {
  db.once('open', () => console.log('connected to database'));
};

if (process.env.NODE_ENV === 'development') {
  databaseSetup();
  Object.values(models).forEach(async (modelProp) => { await modelProp.deleteMany(); });
} else {
  databaseSetup();
}

export default {
  ...models, db,
};