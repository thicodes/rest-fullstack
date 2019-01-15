import { ApiContext } from '../../../TypeDefinition';

const userGet = async (ctx: ApiContext) => {
  ctx.status = 200;
  ctx.body = {};
};

const usersGet = async (ctx: ApiContext) => {
  try {
    ctx.status = 200;
    ctx.body = await UserLoader.loadUsers(ctx, ctx.args);
  } catch (err) {
    ctx.throw(404, err);
  }
};

export { userGet, usersGet };
