import React, { Component } from "react";

class Songcard extends Component {
  render() {
    const { songname, album, author, reqBy } = this.props.info;

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
          <p className="card-text song-card-user">Requested by user: {reqBy}</p>
        </div>
      </div>
    );
  }
}

export default Songcard;
