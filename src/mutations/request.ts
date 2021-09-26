import { gql } from '@apollo/client';

export const GET_REQUESTS = gql`
    mutation($newRequestSubmissionRequestSubmission: RequestSubmissionInput!) {
    newRequestSubmission(requestSubmission: $newRequestSubmissionRequestSubmission) {
        id
        name
        phoneNumber
        email
        status
        case
    }
}`;

export default GET_REQUESTS;
