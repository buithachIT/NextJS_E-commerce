import { gql } from '@apollo/client';

export const GET_SIZE_COLOR = gql`
  query GetAllPaAttributes {
    allPaColor {
      nodes {
        name
        slug
      }
    }
    allPaSize {
      nodes {
        name
        slug
      }
    }
  }
`;
