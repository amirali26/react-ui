import { gql } from '@apollo/client';

export const GET_ACCOUNT = gql`
    query Account($accountId: String!) {
        account(accountId: $accountId) {
            id,
            name,
        }
    }
`;

export default {
  GET_ACCOUNT,
};
