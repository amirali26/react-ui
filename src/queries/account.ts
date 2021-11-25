import { gql } from '@apollo/client';
import { CORE_ACCOUNT_DETAILS } from '../fragments/account';
import { CORE_USER_DETAILS } from '../fragments/user';

export const GET_ACCOUNT = gql`
    ${CORE_ACCOUNT_DETAILS}
    ${CORE_USER_DETAILS}
    query UserAccount($accountId: String!) {
        userAccount(accountId: $accountId) {
            ...AccountDetails,
            users {
            ...UserDetails
            }
        }
    }
`;

export default {
  GET_ACCOUNT,
};
