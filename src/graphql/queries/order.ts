import { gql } from '@apollo/client';

export const GET_ORDER_BY_UID = gql`
  query GetOrderById($id: Int) {
    orders(where: { customerId: $id }) {
      nodes {
        orderNumber
        date
        status
        total

        lineItems {
          nodes {
            quantity
            total
            variation {
              node {
                name
                image {
                  sourceUrl
                }
                attributes {
                  nodes {
                    name
                    value
                  }
                }
              }
            }

            product {
              node {
                name
                slug
                image {
                  sourceUrl
                }
              }
            }
          }
        }
        billing {
          firstName
          lastName
          address1
          city
          country
          email
          phone
        }
      }
    }
  }
`;
