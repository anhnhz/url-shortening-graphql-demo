import 'jest-chain';
import 'jest-extended';

import models from '../models';

beforeAll(async () => {
  await models.Url.deleteMany();
});

afterAll(async () => {
  await models.db.close();
});
