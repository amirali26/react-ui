import { gql } from '@apollo/client';
import { CORE_ACCOUNT_DETAILS } from '../fragments/account';
import CORE_ACCOUNT_USER_INVITATIONS from '../fragments/accountUserInvitations';

export interface IGetUser {
    user: {
        externalId: string,
        name: string,
        dateOfBirth: string,
        phoneNumber: string,
        email: string,
        createdAt: string,
        imageUrl?: string,
        userApproval: boolean,
    }[]
}

export const GET_USER = gql`
    query user {
        user {
            id,
            name,
            dateOfBirth,
            phoneNumber,
            email,
            imageUrl,
            userApproval
        }
    }`;

export const GET_USER_ACCOUNT = gql`
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
            userApproval,
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
  GET_USER_ACCOUNT,
};
