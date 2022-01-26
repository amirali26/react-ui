import { gql } from '@apollo/client';

export const CORE_ACCOUNT_DETAILS = gql`
    fragment AccountDetails on Account {
        id
        name,
        website,
        phoneNumber,
        size,
        email,
        registeredDate,
        areasOfPractice {
            id,
            name
        },
        createdBy {
            id,
            name,
        },
        permission,
        createdAt
    }
`;

const fragments = {
  CORE_ACCOUNT_DETAILS,
};

export default fragments;
