import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetAllProductCategories {
    productCategories(first: 100) {
      nodes {
        id
        name
        slug
        description
        image {
          sourceUrl
        }
        parent {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
