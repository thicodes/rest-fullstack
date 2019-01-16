  updateCache = (cache: object, { data: { createUser } }: object) => {
    const { users } = cache.readQuery({ query: GET_USERS });

    cache.writeQuery({
      query: GET_USERS,
      data: { users: users.concat([createUser]) },
    });
  };

const UserCreate = () => <p>UserCreate</p>;

export default UserCreate;
