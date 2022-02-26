import { gql } from '@apollo/client';
import { CORE_ACCOUNT_DETAILS } from '../fragments/account';

export const VERIFY_ACCOUNT = gql`
  ${CORE_ACCOUNT_DETAILS}
  mutation VerifyAccount($aid: String!) {
    verifyAccount(accountId: $aid) {
      ...AccountDetails
    }
  }
`;

export default VERIFY_ACCOUNT;
