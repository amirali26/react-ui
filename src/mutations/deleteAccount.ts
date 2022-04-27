import { gql } from '@apollo/client';
import { CORE_ACCOUNT_DETAILS } from '../fragments/account';

export const DELETE_ACCOUNT = gql`
  ${CORE_ACCOUNT_DETAILS}
  mutation DeleteAccount {
    deleteAccount {
      ...AccountDetails,
    }
  }
`;

export default DELETE_ACCOUNT;
