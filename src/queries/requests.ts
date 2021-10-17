import { gql } from '@apollo/client';

const GET_REQUESTS = gql`
query Query {
  requestSubmissions {
    id,
    name,
    status,
    case,
    topic,
    phoneNumber,
    email,
    createdDate,
  }
}
`;

export default GET_REQUESTS;
