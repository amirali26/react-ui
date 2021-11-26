import { gql } from '@apollo/client';

export const CORE_ACCOUNT_DETAILS = gql`
    fragment AccountDetails on Account {
        id
        name,
        createdBy {
            id,
            name,
        },
        createdAt
    }
`;

const fragments = {
  CORE_ACCOUNT_DETAILS,
};

export default fragments;
