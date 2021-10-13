import { gql } from '@apollo/client';
import { CORE_ACCOUNT_DETAILS } from '../fragments/account';
import { CORE_USER_DETAILS } from '../fragments/user';

export const GET_ACCOUNT = gql`
    ${CORE_ACCOUNT_DETAILS}
    ${CORE_USER_DETAILS}
    query Account($accountId: String!) {
        account(accountId: $accountId) {
            ...AccountDetails,
            createdBy {
                ...UserDetails
            }
        }
    }
`;

export default {
  GET_ACCOUNT,
};
