export const GET_USERS = gql`
  {
    alerts @rest(type: "Users", path: "users") {
      id
      name
      username
    }
  }
`;
