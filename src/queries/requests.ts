import { gql } from '@apollo/client';

const GET_REQUESTS = gql`
query GetRequests($before: String, $after: String, $last: Int, $searchTermInput: String) {
  requests(before: $before, after: $after, last: $last, searchTermInput: $searchTermInput) {
    pageInfo {
      hasNextPage,
      hasPreviousPage,
      endCursor,
      startCursor
    },
    nodes {
      id,
      requestNumber,
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
