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
        }
      }
    }
  }
`;
export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($categoryIn: [String]) {
    products(where: { categoryIn: $categoryIn }) {
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
          productCategories {
            nodes {
              name
              slug
            }
          }
          sku
          stockStatus
          productTags {
            nodes {
              name
              slug
            }
          }
          attributes {
            nodes {
              name
              options
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
      databaseId
      name
      slug
      description
      shortDescription
      averageRating
      image {
        sourceUrl
        altText
      }
      ... on VariableProduct {
        id
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
            id
            name
            price
            regularPrice
            description
            image {
              altText
              sourceUrl
            }
            sku
            stockStatus
          }
        }
      }
    }
  }
`;
export const GET_LATEST_PRODUCTS = gql`
  query GetLatestProducts {
    products(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        ... on SimpleProduct {
          id
          name
          date
          slug
          price
          regularPrice
          image {
            sourceUrl
          }
        }
        ... on VariableProduct {
          averageRating
          id
          name
          date
          slug
          regularPrice
          price
          image {
            sourceUrl
          }
        }
      }
    }
  }
`;
export const GET_VARIATIONS = gql`
  query GetVariations($id: ID!) {
    product(id: $id) {
      ... on VariableProduct {
        variations {
          nodes {
            databaseId
            name
            price
          }
        }
      }
    }
  }
`;
