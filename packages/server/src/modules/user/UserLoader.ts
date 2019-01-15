import DataLoader from 'dataloader';
import { ApiContext } from '../../TypeDefinition';

export default class User {
  id: string;
  name: string;
  email: string | null | undefined;
  active: boolean | null | undefined;

  constructor(data: IUser) {
    this.id = data.id;
    this.name = data.name;
  }
}

export const getLoader = () =>
  new DataLoader(ids => mongooseLoader(UserModel, ids));

const viewerCanSee = () => true;
export const load = async (context, id) => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloader.UserLoader.loader(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee() ? new User(data, context) : null;
};

export const clearCache = (context: ApiContext, id: Types.ObjectId) =>
  context.dataloaders.UserLoader.clear(id.toString());

type UserArgs = ConnectionArguments & {
  search?: string;
};

export const loadUsers = async (
  context: ApiContext,
  args: ConnectionArguments,
) => {
  const where = args.search
    ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } }
    : {};
  const users = UserModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: users,
    context,
    args,
    loader: load,
  });
};
