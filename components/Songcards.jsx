import React, { Component } from "react";
import Songcard from "./Songcard";
import axios from "axios";
import _ from "lodash";
import queryString from "query-string";

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Songcards extends Component {
  state = {
    songs: null,
  };

  playFrontOfQueue() {
    spotifyApi.play({"uris": [this.state.songs[0].song]});
  }

  async componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    this.setState({ accessToken: parsed.access_token });
    spotifyApi.setAccessToken(parsed.access_token);

    const apiEndpoint = "http://localhost:3000/api/songs/";
    const response = await axios
      .get(apiEndpoint)
      .then()
      .catch(err => console.log(err));
    console.log(response.data);
    this.setState({ songs: response.data });

    playFrontOfQueue();
  }

  playQueue(song) {
    spotifyApi.play({"uris": [song.uri]});
  }

  

  render() {
    return (
      <div>
        <h1>Currently Playing</h1>
        <button onClick={() => this.playQueue(this.state.songs[0].song)}>Play on Device</button>
        {this.state && this.state.songs && (
          <Songcard song={this.state.songs[0].song} />
        )}
        <h1>Queue</h1>
        {this.state.songs &&
          this.state.songs
            .filter(song => this.state.songs.indexOf(song) != 0)
            .map(song => (
              <Songcard
                song={song.song}
                priority={Math.floor(Math.random() * (5 - 1 + 1) + 1)}
                key={song._id}
              />
            ))}
      </div>
    );
  }
}

export default Songcards;
