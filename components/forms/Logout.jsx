import React, { Component } from 'react';
import user from "../../services/userService";

/**
 * @api {Class Component} <Logout/> forms/Logout.jsx
 * @apiName Logout
 * @apiGroup Components
 * @apiDescription  This component logs out the user when mounted.
 * @apiSuccessExample Logout.js
 *    <Logout />
 */
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