import { gql } from '@apollo/client';

const GET_AREASOFLEGALPRACTICE = gql`
    query Query {
        areasOfLegalPractices {
            id,
            name
        }
    }
`;

export default GET_AREASOFLEGALPRACTICE;
