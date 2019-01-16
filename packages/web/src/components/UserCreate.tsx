  updateCache = (cache: object, { data: { createUser } }: object) => {
    const { users } = cache.readQuery({ query: GET_USERS });

    cache.writeQuery({
      query: GET_USERS,
      data: { users: users.concat([createUser]) },
    });
  };

        <Mutation mutation={CREATE_USER} update={this.updateCache}>
          {mutation => (
            <form onSubmit={e => this.handleSubmit(e, mutation)}>
              <input
                type="text"
                placeholder="name"
                name="name"
                value={name}
                onChange={e => this.handleChange(e)}
              />
              <input
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={e => this.handleChange(e)}
              />
              <button type="submit">create</button>
            </form>
          )}
        </Mutation>

export default UserCreate;
