import React, { Component } from 'react';
import user from "../services/userService";

class UserAccount extends Component {
  state = {
    user: {}
  }

  async componentWillMount() {
    const currentUser = await user.getCurrentUser();
    const response = await user.getInfo(currentUser._id);
    this.setState({ user: response.data });
  }

  render() {
    const { username, songsAdded } = this.state.user;

    return (
      <div>
        <h1>{username}</h1>
        <p>Total Number of Songs added to queue: {songsAdded}</p>
      </div>
    );
  }
}

export default UserAccount;