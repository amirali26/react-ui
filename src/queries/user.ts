import { gql } from '@apollo/client';
import { CORE_ACCOUNT_DETAILS } from '../fragments/account';
import { Account } from '../models/account';

export interface IGetUser {
    user: {
        externalId: string,
        name: string,
        dateOfBirth: string,
        phoneNumber: string,
        email: string,
        createdAt: string,
        accounts: Account[],
    }[]
}
export const GET_USER = gql`
    ${CORE_ACCOUNT_DETAILS}
    query user {
        user {
            id,
            name,
            dateOfBirth,
            phoneNumber,
            email,
            accounts {
              ...AccountDetails
            }
        }
    }`;

export default {
  GET_USER,
};
