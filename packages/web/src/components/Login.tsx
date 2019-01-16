import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Redirect, withRouter } from 'react-router-dom';

import { LOGIN_REQUEST } from '../apollo/mutations';

interface State {
  email: string;
  password: string;
  redirectToReferrer: boolean;
}

class Login extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirectToReferrer: false,
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
          // ...this.state,
          email: 'teste@teste.com.br',
          password: '654321',
        },
      },
    });

    this.props.history.push('/');
  };

  render() {
    const { email, password } = this.state;
    const { from } = this.props.location.state || {
      from: { pathname: '/' },
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <Mutation mutation={LOGIN_REQUEST}>
          {mutation => (
            <form onSubmit={e => this.handleSubmit(e, mutation)}>
              <input
                type="text"
                placeholder="email"
                name="email"
                value={email}
                onChange={e => this.handleChange(e)}
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={e => this.handleChange(e)}
              />
              <button type="submit">Login</button>
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Login);
