import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { ApolloServer, graphqlExpress } from 'apollo-server-express';
import cors from 'cors';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import './config/mongoose';

(async function () {
  const PORT = 4000;
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const app = express();

  // app.use('*', cors({ origin: `http://localhost:${PORT}` }));
  // app.use('/graphql', express.json);

  const httpServer = createServer(app);

  const server = new ApolloServer({ schema });
  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
    SubscriptionServer.create(
      {
        schema,
        execute,
        subscribe,
        onConnect: () => {
          console.log('🚀 WS connected');
        },
      },
      {
        server: httpServer,
        // path: server.graphqlPath,
      },
    );

    // eslint-disable-next-line no-console
    console.info(`🚀 Server is running on http://localhost:${PORT}${server.graphqlPath}`);
    console.info(`🚀 Subscription endpoint ready at ws://localhost:${PORT}`);
  });
}());
