import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query Me {
    viewer {
      id
      username
      email
    }
  }
`;
export const VIEWER_QUERY = gql`
  query GetViewer {
    viewer {
      id
      username
      email
    }
  }
`;
