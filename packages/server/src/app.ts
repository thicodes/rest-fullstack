import Koa from 'koa';
import logger from 'koa-logger';
import cors from 'kcors';
import Router from 'koa-router';

import { userGet, usersGet } from './modules/user/routes/UserGet';

const app = new Koa();
const router = new Router();

app.keys = [process.env.JWT_KEY];

app.use(logger());
app.use(cors());

router.get('/api/v1/users/:id', userGet).get('/api/v1/users', usersGet);

app.use(router.routes()).use(router.allowedMethods());

export default app;
