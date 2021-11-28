import { Account } from './account';

export type User = {
    id: string,
    name: string,
    dateOfBirth: string,
    email: string,
    phoneNumber: string,
    accounts: Account[],
}
