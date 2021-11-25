import { gql } from '@apollo/client';

export const CORE_ACCOUNT_DETAILS = gql`
    fragment AccountDetails on Account {
        id
        name,
        permissions {
            id,
            name
        },
<<<<<<< Updated upstream
        createdDate,
=======
        createdBy {
            id,
            name,
        },
        createdAt
>>>>>>> Stashed changes
    }
`;

const fragments = {
  CORE_ACCOUNT_DETAILS,
};

export default fragments;
