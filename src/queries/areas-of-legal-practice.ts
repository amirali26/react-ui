import { gql } from '@apollo/client';

const GET_AREASOFLEGALPRACTICE = gql`
    query GetAreasOfLaw {
        areasOfPractices {
            id,
            externalId,
            name,
        }
    }
`;

export default GET_AREASOFLEGALPRACTICE;
