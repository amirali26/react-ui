import { gql } from '@apollo/client';

export const ADD_ENQUIRY = gql`
    mutation AddEnquiry($eq: EnquiryInput!) {
        addEnquiry(enquiryInput: $eq) {
            id,
        }
    }
`;

export const ADD_GENERATE_CLIENT_TOTP = gql`
    mutation AddGenerateClientTotp($email: String!, $phoneNumber: String!) {
        addGenerateClientTotp(email: $email, phoneNumber: $phoneNumber)
    }
`;

export default {
  ADD_ENQUIRY,
  ADD_GENERATE_CLIENT_TOTP,
};
