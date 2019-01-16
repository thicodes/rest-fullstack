import gql from 'graphql-tag';

export const GET_USERS = gql`
  query users {
    users @rest(type: "Users", path: "users") {
      id
      name
      username
    }
  }
`;
