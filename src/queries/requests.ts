import { gql } from '@apollo/client';

const GET_REQUESTS = gql`
query GetRequests {
  requests {
    id,
    name,
    phoneNumber,
    email,
    description,
    topic {
      name
    }
    createdDate,
  }
}
`;

export default GET_REQUESTS;
