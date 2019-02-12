import React, { Component } from "react";
import _ from "lodash";
import Songcard from "./Songcard";
import PlayerWrapper from "../components/PlayerWrapper";
import song from "../services/songService";
import Spotify from "../services/spotifyService";

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Songcards extends Component {
  state = {
    songs: null,
  };

  async componentDidMount() {
    const token = Spotify.getSpotifyAccessToken();
    this.setState({ accessToken: token });
    spotifyApi.setAccessToken(token);

    const response = await song.getSongs();
    this.setState({ songs: response.data });
  }

  startMusic = (uri) => {
    console.log("start");
    spotifyApi.play({ "uris": [this.state.songs[0].song.song.uri] });
  }

  playMusic = () => {
    console.log("play");
    spotifyApi.play({});
  }

  pauseMusic = () => {
    console.log("pause");
    spotifyApi.pause({});
  }

  handleDelete = (id) => {
    const songs = _.filter(this.state.songs, song => { return song._id !== id });
    this.setState({ songs });
    const response = song.deleteSong(id);
  }

  checkSongs = () => {
    const { songs } = this.state;
    if (songs === undefined || songs === null || songs.length === 0) {
      return false;
    }
    else {
      return true;
    }
  }

  areSongsInQueue = () => {
    const { songs } = this.state;
    if (songs.length === 1)
      return false;
    else {
      return true;
    }
  }

  renderPlaceholder = () => {
    return (
      <div className="placeholder">
        <p><img src="static/no-songs.png" /> Songs added to the queue will appear here</p>
      </div>
    );
  }

  render() {

    const areThereSongs = this.checkSongs();

    return (
      <div>
        {!areThereSongs
          ?
          <React.Fragment>
            <h1>Queue</h1>
            {this.renderPlaceholder()}
          </React.Fragment>
          :
          <React.Fragment>
            <PlayerWrapper start={this.startMusic} play={this.playMusic} pause={this.pauseMusic}>
              <Songcard
                currentSong="true"
                songObj={this.state.songs[0]}
                onDelete={this.handleDelete}
                priority={Math.floor(Math.random() * (5 - 1 + 1) + 1)}
              />
            </PlayerWrapper>
            <h1>Queue</h1>
            {!this.areSongsInQueue()
              ?
              this.renderPlaceholder()
              :
              this.state.songs
                .filter(song => this.state.songs.indexOf(song) != 0)
                .map(song => (
                  <Songcard
                    songObj={song}
                    onDelete={this.handleDelete}
                    priority={Math.floor(Math.random() * (5 - 1 + 1) + 1)}
                    key={song._id}
                  />
                ))}
          </React.Fragment>
        }
      </div>
    );
  }
}

export default Songcards;
