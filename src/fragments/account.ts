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
        imageUrl,
        areasOfPractice {
            id,
            name
        },
        createdBy {
            id,
            name,
        },
        permission,
        createdAt,
        firmVerified,
    }
`;

const fragments = {
  CORE_ACCOUNT_DETAILS,
};

export default fragments;
