import { gql } from '@apollo/client';

const GET_ENQUIRIES = gql`
query GetEnquiries($before: String, $after: String, $last: Int, $searchTermInput: String) {
  enquiries(before: $before, after: $after, last: $last, searchTermInput: $searchTermInput) {
    pageInfo {
      hasNextPage,
      hasPreviousPage,
      endCursor,
      startCursor
    },
    nodes {
       id,
        message,
        initialConsultationFee,
        estimatedPrice,
        officeAppointment,
        phoneAppointment,
        videoCallAppointment,
        createdAt,
        status,
        user {
            name,
            email,
        }
        request {
          id,
          requestNumber,
          client {
            name,
            phoneNumber,
            email,
          }
          description,
          topic {
            name
          }
          createdDate,
        }
    },
    edges {
      cursor
    },
    totalCount
  },
}
`;

export const GET_ALL_CLIENT_ENQUIRIES = gql`
  query AllClietQueries($token: String!, $phoneNumber: String!, $email: String!) {
    allClientQueries(token: $token, phoneNumber: $phoneNumber, email: $email) {
      id,
    }
  }
`;

export default GET_ENQUIRIES;
