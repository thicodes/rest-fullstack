import Dataloader from 'dataloader';

type Key = string;

export type Dataloaders = {
  UserLoader: Dataloader<Key, IUser>;
};

export type ApiContext = {
  dataloaders: Dataloaders;
};
