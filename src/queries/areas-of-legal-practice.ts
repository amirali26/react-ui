import { gql } from '@apollo/client';

const GET_AREASOFLEGALPRACTICE = gql`
    query GetAreasOfLaw {
        areasOfPractices {
            id,
            name,
        }
    }
`;

export default GET_AREASOFLEGALPRACTICE;
