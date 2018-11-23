import React, { Component } from "react";

class Songcard extends Component {
  //this.props.info.songname
  //this.props.info.album
  //this.props.info.artist
  render() {
    const { songname, album, author } = this.props.info;

    return (
      <div className="card song-card">
        <div className="card-body">
          <h5 className="card-title">{songname}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {album + ", " + author}
          </h6>
          <p className="card-text">a description of the song</p>
          <a href="#" className="card-link">
            More info
          </a>
        </div>
      </div>
    );
  }
}

export default Songcard;
