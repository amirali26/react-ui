import { gql } from '@apollo/client';
import { CORE_ACCOUNT_DETAILS } from '../fragments/account';
import CORE_ACCOUNT_USER_INVITATIONS from '../fragments/accountUserInvitations';
import { Account } from '../models/account';

export interface IGetUser {
    user: {
        externalId: string,
        name: string,
        dateOfBirth: string,
        phoneNumber: string,
        email: string,
        createdAt: string,
        imageUrl?: string,
        accounts: Account[],
    }[]
}
export const GET_USER = gql`
    ${CORE_ACCOUNT_DETAILS}
    ${CORE_ACCOUNT_USER_INVITATIONS}
    query user {
        user {
            id,
            name,
            dateOfBirth,
            phoneNumber,
            email,
            imageUrl,
            accounts {
              ...AccountDetails,
              accountUserInvitations {
                  ...AccountUserInvitationDetails,
              }
              users {
                  id,
                  email,
                  name
              }
            },
            accountUserInvitations {
                ...AccountUserInvitationDetails
            }
        }
    }`;

export default {
  GET_USER,
};
