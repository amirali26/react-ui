import { gql } from '@apollo/client';

export const ADD_ENQUIRY = gql`
    mutation AddEnquiry($eq: EnquiryInput!) {
        addEnquiry(enquiryInput: $eq) {
            id,
        }
    }
`;

export default {
  ADD_ENQUIRY,
};
