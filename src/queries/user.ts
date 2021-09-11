import { gql } from '@apollo/client';
import { CORE_ACCOUNT_DETAILS } from '../fragments/account';

export interface IGetUser {
    user: {
        id: string,
        name: string,
        accounts: Account[],
    }
}
export const GET_USER = gql`
    ${CORE_ACCOUNT_DETAILS}
    query User($userId: String!) {
        user(userId: $userId) {
            id,
            name,
            accounts {
            ...AccountDetails
            }
        }
    }
`;

export default {
  GET_USER,
};
