import { gql } from '@apollo/client';

const GET_ACCOUNT_USER_INVITATION = gql`
  query GetAccountUserInvitation {
    accountUserInvitations {
      id,
      account {
        name
      },
      referUser {
        name,
        email,
      },
      createdAt
    }
  }
`;

export default GET_ACCOUNT_USER_INVITATION;
