import React, { Component } from 'react';
import queryString from "query-string";
import Spotify from "../services/spotifyService";

class Index extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to the BJSS Office Jukebox</h1>
        <p>Your office's very own DJ, who's always taking requests!</p>
      </div>
    );
  }
}

export default Index;