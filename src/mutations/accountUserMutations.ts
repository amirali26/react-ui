import { gql } from '@apollo/client';

const ADD_ACCOUNT_USER_INVITATIONS = gql`
  mutation ADD_ACCOUNT_USER_INVITATIONS($auii: AccountUserInvitationInput!) {
    addAccountUserInvitations(accountUserInvitationInput: $auii) {
      id,
      userEmail,
      createdAt,
    }
  }
`;

export default ADD_ACCOUNT_USER_INVITATIONS;
