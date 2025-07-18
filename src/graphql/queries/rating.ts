import { gql } from '@apollo/client';

export const GET_REVIEWS_BY_PRODUCT = gql`
  query GetProductReviews($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      reviews {
        nodes {
          id
          content
          rating
          author {
            node {
              name
            }
          }
          date
        }
      }
    }
  }
`;
export const CREATE_REVIEW = gql`
  mutation CreateProductReview($input: CreateProductReviewInput!) {
    createProductReview(input: $input) {
      comment {
        id
        content
        rating
      }
    }
  }
`;
