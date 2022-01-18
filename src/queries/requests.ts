import { gql } from '@apollo/client';

const GET_REQUESTS = gql`
query GetRequests {
  requests {
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
  }
}
`;

export default GET_REQUESTS;
