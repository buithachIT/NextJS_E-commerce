import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        email
        username
        firstName
        lastName
      }
    }
  }
`;
export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($id: ID!, $password: String!) {
    updateUser(input: { id: $id, password: $password }) {
      user {
        name
      }
    }
  }
`;
