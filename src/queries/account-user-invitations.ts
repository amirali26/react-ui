import { gql } from '@apollo/client';
import CORE_ACCOUNT_USER_INVITATIONS from '../fragments/accountUserInvitations';

const GET_ACCOUNT_USER_INVITATION = gql`
  ${CORE_ACCOUNT_USER_INVITATIONS}
  query GetAccountUserInvitation {
    accountUserInvitations {
      ...AccountUserInvitationDetails
    }
  }
`;

export default GET_ACCOUNT_USER_INVITATION;
