import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import urlServices from './services';

const schema = buildSchema(`
  type Query {
    hello: String
    shortenURL(link: String!): String
  }
`);

const root = {
  hello: () => 'Hello world!',
  shortenURL: async ({ link }, { protocol, headers: { host } }) => {
    const shortId = await urlServices.createShortURL(link);
    return `${protocol}://${host}/${shortId}`;
  },
};

export default graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
});
