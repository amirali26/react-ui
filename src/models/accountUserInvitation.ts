import { Account } from './account';
import { User } from './user';

type AccountUserInvitation = {
  id: string;
  account: Account;
  referUser: User,
  createdAt: string,
};

export default AccountUserInvitation;
