import { gql } from '@apollo/client';

export const GET_PRODUCTS_BY_TAG = gql`
  query GetProductsByTag($tag: [String]) {
    products(first: 4, where: { tagIn: $tag }) {
      nodes {
        id
        name
        slug
        description
        averageRating
        shortDescription
        image {
          sourceUrl
          altText
        }

        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          sku
          stockStatus
          productTags {
            nodes {
              name
              slug
            }
          }
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
          sku
          stockStatus
          productTags {
            nodes {
              name
              slug
            }
          }
          variations(first: 10) {
            nodes {
              name
              price
              sku
              stockStatus
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      name
      slug
      description
      shortDescription
      averageRating
      image {
        sourceUrl
        altText
      }
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        sku
        stockStatus
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
      }
      ... on VariableProduct {
        price
        regularPrice
        salePrice
        sku
        stockStatus
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
        variations(first: 100) {
          nodes {
            name
            price
            sku
            stockStatus
          }
        }
      }
    }
  }
`;
