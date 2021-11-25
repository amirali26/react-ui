import { gql } from '@apollo/client';
import { CORE_ACCOUNT_DETAILS } from '../fragments/account';

export const ADD_ACCOUNT = gql`
    ${CORE_ACCOUNT_DETAILS}
    mutation AddAccount($accountInput: AccountInput!) {
        addAccount(accountInput: $accountInput) {
            ...AccountDetails
        }
    }
`;

export default {
  ADD_ACCOUNT,
};
