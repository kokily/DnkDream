import { ApolloServer, gql } from 'apollo-server-koa';
import { Context } from 'koa';
import { createConnection } from 'typeorm';
import fs from 'fs';
import './env';
import app, { router } from './app';
import ConnectionOptions from './ormConfig';
import schema from './schema';
import api from './api';

const { PORT: port } = process.env;

const apollo = new ApolloServer({
  schema,
  context: ({ ctx }: { ctx: Context }) => ({ ctx }),
});

// Routes
router.use('/api', api.routes());
router.get('/graphql', apollo.getMiddleware());
router.post('/graphql', apollo.getMiddleware());

apollo.applyMiddleware({ app });

// Upload Images Directory Check
try {
  fs.accessSync('uploads');
} catch (err) {
  console.log('uploads 디렉토리가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

createConnection(ConnectionOptions)
  .then(() => {
    app.listen(port, () => console.log(`Apollo Server on ${port} port`));
  })
  .catch((err) => console.error(err));
