import { gql } from '@apollo/client';

const GET_REQUESTS = gql`
query Query {
  requestSubmissions {
    id,
    name,
    status,
    case,
    phoneNumber,
    email,
  }
}
`;

export default GET_REQUESTS;
