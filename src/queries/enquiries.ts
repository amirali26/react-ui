import { gql } from '@apollo/client';

const GET_ENQUIRIES = gql`
query GetEnquiries {
    enquiries {
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
}
`;

export default GET_ENQUIRIES;
