import React, { Component } from 'react';
import queryString from "query-string";
import Spotify from "../services/spotifyService";

class Index extends Component {
  state = {
    token: ""
  }

  componentDidMount() {
    const token = Spotify.getSpotifyAccessToken();
    if (!token) {
      const parsed = queryString.parse(window.location.search);
      console.log(parsed);
      Spotify.setSpotifyAccessToken(parsed.access_token);
      this.setState({ token: parsed.access_token });
    }
    else {
      this.setState({ token: token });
    }
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>Access Token: {this.state.token}</p>
      </div>
    );
  }
}

export default Index;