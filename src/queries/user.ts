import { gql } from '@apollo/client';

export const GET_USER = gql`
    query User($userId: String!) {
        user(userId: $userId) {
            id,
            name,
            accounts {
                id,
                name
            }
        }
    }
`;

export default {
  GET_USER,
};
