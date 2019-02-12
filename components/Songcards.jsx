import React, { Component } from "react";
import _ from "lodash";
import Songcard from "./Songcard";
import song from "../services/songService";
import axios from "axios";
import queryString from "query-string";

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Songcards extends Component {
  state = {
    songs: null,
  };

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

    this.startMusic();
    
  }
  initalisePlaylist() {
    //spotifyApi.createPlaylist('robbbbb_', {name: "my new playlist"})
    var songsInQueue = "";
    var qSong;

    for (i = 0; i < this.state.songs.length; i++) {
      console.log(songsInQueue);
      console.log(this.state.songs[i].song.song.uri);

      songsInQueue += qSong.song.uri
      songsInQueue += ","
    }

    //spotifyApi.addTracksToPlaylist('spotify:user:robbbbb_:playlist:4wlOw4FPH7qnPozfsiIrmn')
  }

  playNextSong() {
    console.log(this.state.songs[0]._id);
    //handleDelete(this.state.songs[0]._id);
    //spotifyApi.play({"uris": [song.uri]});
    
  }

  playNextSong() {
    spotifyApi.play({"uris": [this.state.songs[0].song.song.uri]});
  }

  startMusic(song){
    spotifyApi.play({"uris": [this.state.songs[0].song.song.uri]});
    //console.log("play in 5");
    //setTimeout(function() { playNextSong(); }.bind(this), 5000);
  }

  skipMusic() {
    this.handleDelete(this.state.songs[0]._id);
    this.startMusic();
  }

  // playOrPauseMusic() {

  //   spotifyApi.getMyCurrentPlaybackState({}, function(err, data) {
  //     console.log(data);

  //     if (data.is_playing == false) {
  //       console.log("hi");
  //       spotifyApi.play({});
  //     }
  //     else {
  //       spotifyApi.pause({});
  //     }
  //   });

  // }

  playMusic() {
    spotifyApi.play({});
  }

  pauseMusic() {
    spotifyApi.pause({});
  }

  repeatTrack() {
    spotifyApi.setRepeat("track", {});
  }

  handleDelete = (id) => {
    const songs = _.filter(this.state.songs, song => { return song._id !== id });
    this.state = {songs};
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
        <div>
          
          <button onClick={() => this.playMusic()}>Resume</button>
          <button onClick={() => this.pauseMusic()}>Pause</button>
          <button onClick={() => this.skipMusic()}>Skip</button>
          <button onClick={() => this.repeatTrack()}>Repeat</button>
        </div>
        {!areThereSongs
          ?
          <React.Fragment>
            <h1>Queue</h1>
            {this.renderPlaceholder()}
          </React.Fragment>
          :
          <React.Fragment>
            <h1>Currently Playing</h1>
            <Songcard
              songObj={this.state.songs[0]}
              onDelete={this.handleDelete}
              priority={Math.floor(Math.random() * (5 - 1 + 1) + 1)}
            />
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
