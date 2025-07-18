import { gql } from '@apollo/client';

export const VIEWER_QUERY = `
  query GetCurrentUser {
  viewer {
    id
    databaseId
    email
    username
    name
    firstName
    lastName
    roles {
      nodes {
        name
      }
    }
  }
}
`;
export const TYPE_VIEWER_QUERY = gql`
  query GetCurrentUser {
    viewer {
      id
      databaseId
      email
      username
      name
      firstName
      lastName
      roles {
        nodes {
          name
        }
      }
    }
  }
`;
