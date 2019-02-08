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
    console.log(response.data)
    this.setState({ songs: response.data });
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
        <p><img src="static/no-songs.png"/> Songs added to the queue will appear here</p>
      </div>
    );
  }

  render() {

    const areThereSongs = this.checkSongs();

    return (
      <div>
        { !areThereSongs 
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
              priority={Math.floor(Math.random() * (5 - 1 + 1) + 1)} 
            />
            <h1>Queue</h1>
            { !this.areSongsInQueue() 
              ?
              this.renderPlaceholder()
              :
              this.state.songs
              .filter(song => this.state.songs.indexOf(song) != 0)
              .map(song => (
                <Songcard
                  songObj={song}
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
