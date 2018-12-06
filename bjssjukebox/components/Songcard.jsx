import React, { Component } from "react";

class Songcard extends Component {
  render() {
    const { artpath, songname, album, author, priority, reqBy } = this.props.info;

    const colour = "priority-" + priority + " card-body";

    return (
      <div className="card song-card">
        <table className="card-table" width="100%"><tr>
          <th width="121">
            <img className="card-art" src={artpath} width="121"/>
          </th>
          <th>
            <div id="text" className={colour}>
              <h5 className="card-title">{songname}</h5>
              <h6 className="card-subtitle mb-2">
                {album + ", " + author}
              </h6>
              <a href="#" className="card-link">
                More info
              </a>
              <p className="card-text song-card-user">Requested by: {reqBy}</p>
            </div>
          </th>
        </tr></table>
      </div>
    );
  }
}

export default Songcard;
