import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(
      input: {
        clientMutationId: "login123"
        username: $username
        password: $password
      }
    ) {
      authToken
      refreshToken
      user {
        id
        email
        username
      }
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = `
  mutation RefreshToken($refreshToken: String!) {
    refreshJwtAuthToken(input: {
      clientMutationId: "refresh",
      jwtRefreshToken: $refreshToken
    }) {
      authToken
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerUser(
      input: {
        username: $username
        email: $email
        password: $password
        clientMutationId: "register"
      }
    ) {
      user {
        id
        username
        email
      }
    }
  }
`;
