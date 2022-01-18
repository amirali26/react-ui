import { Account } from './account';
import { User } from './user';

export enum AccountUserInvitationStatus {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
}

type AccountUserInvitation = {
  id: string;
  account: Account;
  referUser: User,
  createdAt: string,
  userEmail: string,
  status: AccountUserInvitationStatus,
};

export default AccountUserInvitation;
