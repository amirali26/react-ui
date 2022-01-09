import { gql } from '@apollo/client';
import { CORE_ACCOUNT_DETAILS } from './account';

export const CORE_ACCOUNT_USER_INVITATIONS = gql`
    ${CORE_ACCOUNT_DETAILS}
    fragment AccountUserInvitationDetails on AccountUserInvitation {
        id,
        userEmail,
        status,
        account {
          ...AccountDetails
        },
        referUser {
          id,
          name,
        }
        createdAt
    }
`;

export default CORE_ACCOUNT_USER_INVITATIONS;
