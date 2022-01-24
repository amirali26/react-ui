import { gql } from '@apollo/client';
import { CORE_ACCOUNT_DETAILS } from '../fragments/account';

const ACCEPT_OR_REJECT_ACCOUNT_USER_INVITATION = gql`
 ${CORE_ACCOUNT_DETAILS}
  mutation AcceptOrRejectAccountUserInvitation($aui: String!, $auis: Int!) {
    acceptOrRejectAccountUserInvitation(accountUserInvitationId: $aui, accountUserInvitationStatus: $auis) {
      id,
      account {
        ...AccountDetails
      }
    }
  }
`;

export const REJECT_ACCOUNT_USER_INVITATION = gql`
  mutation REJECT_ACCOUNT_USER_INVITATION($str: String!) {
    deleteAccountUserInvitation(userEmail: $str) {
      id
    }
  }
`;

export default ACCEPT_OR_REJECT_ACCOUNT_USER_INVITATION;
