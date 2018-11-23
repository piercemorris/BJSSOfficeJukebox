import React, { Component } from "react";

class Songcard extends Component {
  //this.props.info.songname
  //this.props.info.album
  //this.props.info.artist
  render() {
    const { songname, album, artist } = this.props.info;

    return (
      <div className="card song-card">
        <div className="card-body">
          <h5 className="card-title">{songname}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {album + ", " + artist}
          </h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="card-link">
            Card link
          </a>
          <a href="#" className="card-link">
            Another link
          </a>
        </div>
      </div>
    );
  }
}

export default Songcard;
