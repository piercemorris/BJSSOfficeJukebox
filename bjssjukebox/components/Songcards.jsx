import React, { Component } from "react";
import Songcard from "./Songcard";
import axios from "axios";

class Songcards extends Component {
  state = {
    info: [
      {
        songname: "Devil in a new dress",
        album: "My Beautiful Dark Twisted Fantasy",
        author: "Kanye West",
        priority: 1,
        reqBy: "perjermer"
      },
      {
        songname: "Ultralight Beam",
        album: "The Life of Pablo",
        author: "Kanye West",
        priority: 2,
        reqBy: "perjermer"
      },
      {
        songname: "November",
        album: "Flower Boy",
        author: "Tyler the Creator",
        priority: 3,
        reqBy: "perjermer"
      },
      {
        songname: "NO FUN",
        album: "BALLADS1",
        author: "Joji",
        priority: 4,
        reqBy: "perjermer"
      },
      {
        songname: "All Mine",
        album: "Ye",
        author: "Kanye West",
        priority: 5,
        reqBy: "perjermer"
      }
    ],
    songs: []
  };

  async componentDidMount() {
    const apiEndpoint = "http://localhost:3000/api/songs/";
    const response = await axios
      .get(apiEndpoint)
      .then()
      .catch(err => console.log(err));
    //console.log(response);
    this.setState({ songs: response.data });
  }

  render() {
    return (
      <div>
        <h1>Currently Playing</h1>
        <Songcard info={this.state.songs[0]} />
        <h1>Queue</h1>
        {this.state.songs
          .filter(song => this.state.songs.indexOf(song) != 0)
          .map(song => (
            <Songcard info={song} key={song._id} />
          ))}
      </div>
    );
  }
}

export default Songcards;
