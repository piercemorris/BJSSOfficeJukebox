import React, { Component } from 'react';

class Logout extends Component {
  state = {}

  componentDidMount() {
    try {
      localStorage.removeItem('token');
      window.location = '/';
    }
    catch (ex) {

    }
  }

  render() {
    return (
      <div>
        <h1>Logout</h1>
        <p>YOU HAVE SUCCESFULLY LOGGED OUT</p>
      </div>
    );
  }
}

export default Logout;