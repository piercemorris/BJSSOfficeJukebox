import React, { Component } from 'react';
import user from "../services/userService";

class Logout extends Component {
  state = {}

  componentDidMount() {
    try {
      user.logout();
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