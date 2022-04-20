import { gql } from '@apollo/client';
import { CORE_USER_DETAILS } from '../fragments/user';

const UPDATE_USER_PROFILE_IMAGE = gql`
  ${CORE_USER_DETAILS}
  mutation AddUserProfileImage($imageUrl: String) {
    addUserProfileImage(imageUrl: $imageUrl) {
      ...UserDetails
    }
  }
`;

export default UPDATE_USER_PROFILE_IMAGE;
