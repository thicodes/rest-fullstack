import React from 'react';
import { graphql, Query } from 'react-apollo';

import { GET_USERS } from '../apollo/queries';

const UserList = () => (
  <Query query={GET_USERS}>
    {({ loading, error, data }) => {
      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) return <p>Error</p>;
      return (
        <div>
          {data.users.map((data, index) => (
            <React.Fragment key={data.id}>
              <div>
                <b>name:</b> {data.name}
              </div>
              <div>
                <b>username:</b> {data.name}
              </div>
            </React.Fragment>
          ))}
        </div>
      );
    }}
  </Query>
);

export default UserList;
