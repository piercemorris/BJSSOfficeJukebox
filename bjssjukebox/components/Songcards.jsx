import React, { Component } from "react";
import Songcard from "./Songcard";
import axios from "axios";

class Songcards extends Component {
  state = {
    info: [
      {
        artpath: "static/sample-album-art1.png",
        songname: "Devil in a New Dress",
        album: "My Beautiful Dark Twisted Fantasy",
        author: "Kanye West",
        priority: 1,
        reqBy: "perjermer"
      },
      {
        artpath: "static/sample-album-art2.png",
        songname: "Ultralight Beam",
        album: "The Life of Pablo",
        author: "Kanye West",
        priority: 2,
        reqBy: "perjermer"
      },
      {
        artpath: "static/sample-album-art3.png",
        songname: "November",
        album: "Flower Boy",
        author: "Tyler the Creator",
        priority: 3,
        reqBy: "perjermer"
      },
      {
        artpath: "static/sample-album-art4.png",
        songname: "NO FUN",
        album: "BALLADS1",
        author: "Joji",
        priority: 4,
        reqBy: "perjermer"
      },
      {
        artpath: "static/sample-album-art5.png",
        songname: "All Mine",
        album: "Ye",
        author: "Kanye West",
        priority: 5,
        reqBy: "perjermer"
      }
    ],
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

  render() {
    return (
      <div>
        <h1>Currently Playing</h1>
        {this.state && this.state.songs && (
          <Songcard song={this.state.songs[0].song} />
        )}
        <h1>Queue</h1>
        {this.state.songs &&
          this.state.songs
            .filter(song => this.state.songs.indexOf(song) != 0)
            .map(song => <Songcard song={song.song} key={song._id} />)}
      </div>
    );
  }
}

export default Songcards;
