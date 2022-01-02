import { gql } from '@apollo/client';

const GET_ACCOUNT_USER_INVITATION = gql`
  query GetAccountUserInvitation {
    accountUserInvitations {
      id,
    }
  }
`;

export default GET_ACCOUNT_USER_INVITATION;
