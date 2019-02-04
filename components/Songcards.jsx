import React, { Component } from "react";
import Songcard from "./Songcard";
import axios from "axios";

class Songcards extends Component {
  state = {
    songs: null
  };

  async componentDidMount() {
    const apiEndpoint = "http://localhost:3000/api/songs/";
    const response = await axios
      .get(apiEndpoint)
      .then()
      .catch(err => console.log(err));
    console.log(response.data);
    this.setState({ songs: response.data });
  }

  renderSongs = () => {
    const { songs } = this.state;
    if (songs === undefined || songs === null || songs.length === 0) {
      return null;
    }
    else {
      return <Songcard song={songs[0].song} />;
    }
  }

  render() {
    return (
      <div>
        <h1>Currently Playing</h1>
        {!this.state.songs && (
          <div class="placeholder">
            <p><img src="static/no-songs.png"/> Songs added to the queue will appear here</p>
          </div>
        )}
        {this.state && this.state.songs && (
          <Songcard 
            song={this.state.songs[0].song}
            priority={Math.floor(Math.random() * (5 - 1 + 1) + 1)} 
          />
        )}
        <h1>Queue</h1>
        {!this.state.songs && (
          <div class="placeholder">
            <p><img src="static/no-songs.png"/> Songs added to the queue will appear here</p>
          </div>
        )}
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
