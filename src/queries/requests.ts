import { gql } from '@apollo/client';

const GET_REQUESTS = gql`
query GetRequests($before: String, $after: String, $last: Int) {
  requests(before: $before, after: $after, last: $last) {
    pageInfo {
      hasNextPage,
      hasPreviousPage,
      endCursor,
      startCursor
    },
    nodes {
      id,
      client {
        name,
        email,
        phoneNumber
      },
      description,
      topic {
        name
      }
      createdDate,
    },
    edges {
      cursor
    },
    totalCount
  },
}
`;

export default GET_REQUESTS;
