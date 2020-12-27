import Koa from 'koa';
import JWT from 'koa-jwt';
import path from 'path';
import helmet from 'koa-helmet';
import statics from 'koa-static';
import router from './routes/routes';
import koaBody from 'koa-body';
import jsonutil from 'koa-json';
import cors from '@koa/cors';
import compose from 'koa-compose';
import compress from 'koa-compress';
import config from './config/index';
import errorHandle from './common/ErrorHandle';

const app = new Koa();
const isDevMode = process.env.NODE_ENV !== 'production';

// app.use(helmet());
// app.use(statics(path.join(__dirname, '../public')));
// app.use(router());

const jwt = JWT({ secret: config.JWT_SECRET }).unless({ path: [/^\/public/, /\/auth/] });

// 把中間件 compose
const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  jsonutil({ pretty: false, param: 'pretty' }),
  helmet(),
  errorHandle,
  jwt
]);

if (!isDevMode) {
  // production
  app.use(compress());
}

app.use(middleware);
app.use(router());


app.listen(3000);
