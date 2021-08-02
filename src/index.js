import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import './config/mongoose';

const apolloServer = async () => {
  const server = new ApolloServer({typeDefs, resolvers});

  const PORT = 4000 || process.env.PORT;

  const app = express();

  await server.start();
  server.applyMiddleware({app});

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.info(`🚀 Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
};

apolloServer();
