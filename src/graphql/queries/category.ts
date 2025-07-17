import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetAllCategories {
    productCategories(first: 100) {
      nodes {
        id
        name
        slug
        display
      }
    }
  }
`;
