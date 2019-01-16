import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation createUser {
    createUser(input: $input)
      @rest(type: "Users", path: "users", method: "POST") {
      id
      name
      username
    }
  }
`;

export const LOGIN_REQUEST = gql`
  mutation loginRequest($email: String!, $password: String!) {
    loginRequest(input: { email: $email, password: $password })
      @rest(type: "Post", path: "login", method: "POST") {
      token
    }
  }
`;
