import { user } from "src/app/entity";

export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: user,
  },
];