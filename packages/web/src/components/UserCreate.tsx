import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { CREATE_USER } from '../apollo/mutations';
import { GET_USERS } from '../apollo/queries';

interface State {
  name: string;
  username: string;
}

class UserCreate extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      name: '',
      username: '',
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e, mutation) => {
    e.preventDefault();

    mutation({
      variables: {
        input: {
          ...this.state,
        },
      },
    });

    this.props.history.push('/');
  };

  updateCache = (cache: object, { data: { createUser } }: object) => {
    const { users } = cache.readQuery({ query: GET_USERS });

    cache.writeQuery({
      query: GET_USERS,
      data: { users: users.concat([createUser]) },
    });
  };

  render() {
    const { name, username } = this.state;

    return (
      <div>
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
      </div>
    );
  }
}

export default withRouter(UserCreate);
