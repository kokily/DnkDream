import Koa, { Context } from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import logger from 'koa-logger';
import bodyParser from 'koa-body';
import serve from 'koa-static';
import send from 'koa-send';
import path from 'path';

const app = new Koa();
export const router = new Router();
const rootDir = path.join(process.cwd(), './../frontend/build');

app.use(cors());
app.use(logger());

// Image Static Serve
app.use(serve(path.join(__dirname, './../uploads')));
app.use(bodyParser({ multipart: true }));

app.use(router.routes());
app.use(router.allowedMethods());

// Koa Static Serve
app.use(serve(rootDir));
app.use(async (ctx: Context) => {
  if (
    ctx.status === 404 &&
    ctx.path.indexOf('/api') !== 0 &&
    ctx.path.indexOf('/graphql') !== 0 &&
    ctx.path.indexOf('/uploads') !== 0
  ) {
    await send(ctx, 'index.html', {
      root: rootDir,
    });
  }
});

export default app;