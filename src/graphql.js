import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import urlServices from './services';

const schema = buildSchema(`
  type Mutation {
    shortenURL(url: String): String
  }

  type Query {
    hello: String
  }
`);

const root = {
  hello: () => 'Hello world!',
  shortenURL: async ({ url }) => {
    const string = await urlServices.createShortURL(url);
    return string;
  },
};

export default graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
});
