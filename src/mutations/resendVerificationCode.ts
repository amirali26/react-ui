import { gql } from '@apollo/client';

export const RESEND_VERIFICATION_CODE = gql`
  mutation ResendVerificationCode {
    resendVerificationCode {
      id,
      name
    }
  }
`;

export default RESEND_VERIFICATION_CODE;
