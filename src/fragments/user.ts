import { gql } from '@apollo/client';

export const CORE_USER_DETAILS = gql`
    fragment UserDetails on User {
        id,
        name,
        phoneNumber,
        email,
        imageUrl,
    }
`;

const fragments = {
  CORE_USER_DETAILS,
};

export default fragments;
