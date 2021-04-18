/* eslint-disable no-console */
import mongoose, { Schema, model } from 'mongoose';

import env from '../env';
import urlSchema from './url';

const models = {
  url: model('URL', urlSchema(Schema)),
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
