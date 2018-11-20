import React, { Component } from "react";

class Songcard extends Component {
  //this.props.info.songname
  //this.props.info.album
  //this.props.info.artist
  render() {
    return (
      <div className="song-card">
        <h1>{this.props.info.songname}</h1>
      </div>
    );
  }
}

export default Songcard;
