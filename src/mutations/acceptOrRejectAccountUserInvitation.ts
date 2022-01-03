import { gql } from '@apollo/client';

const ACCEPT_OR_REJECT_ACCOUNT_USER_INVITATION = gql`
  mutation AcceptOrRejectAccountUserInvitation($aui: String!, $auis: Int!) {
    acceptOrRejectAccountUserInvitation(accountUserInvitationId: $aui, accountUserInvitationStatus: $auis) {
      id,
    }
  }
`;

export default ACCEPT_OR_REJECT_ACCOUNT_USER_INVITATION;
