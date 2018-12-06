import React, { Component } from "react";

class Songcard extends Component {
  render() {
    const { artpath, songname, album, author, priority, reqBy } = this.props.info;

    const colour = "priority-" + priority + " card-body";

    return (
      <div className="card song-card">
        <table className="card-table" width="100%"><tr>
          <th width="161">
            <img className="card-art" src={artpath} width="161"/>
          </th>
          <th>
            <div className={colour}>
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
          </th>
        </tr></table>
      </div>
    );
  }
}

export default Songcard;
