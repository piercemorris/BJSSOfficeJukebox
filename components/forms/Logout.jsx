import React, { Component } from 'react';
import user from "../../services/userService";

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
      null
    );
  }
}

export default Logout;