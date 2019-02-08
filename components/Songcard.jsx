import React, { Component } from "react";

class Songcard extends Component {
  render() {
    const { songObj, priority } = this.props;
    const song = songObj.song.song;
    const user = songObj.username;
    const colour = "priority-" + priority + " card-body";

    return (
      <React.Fragment>
        { !song 
          ?
          <h1>No Song</h1>
          :
          <div className="card song-card">
            <table className="card-table" width="100%">
              <tr>
                <th width="121" className="card-image">
                  <img
                    className="card-art"
                    src={song.album.images[1].url}
                    width="121"
                  />
                </th>
                <th className={"card-header-body"}>
                  <div id="text">
                    <p className="card-priority">
                      Priority&nbsp; <div className={colour + " circle"}></div>
                    </p>
                    <h5 className="card-title">{song.name}</h5>
                    <h6 className="card-subtitle mb-2">
                      {song.album.name + ", " + song.artists[0].name}
                    </h6>
                    {song.explicit ?  <img id="explicit_tag" src="static/explicit.png" width="70px"/>: null}
                    <a href="#" className="card-link">More info</a>
                    <p className="card-text song-card-user">
                      Requested by: {user}
                    </p>
                  </div>
                </th>
              </tr>
            </table>
          </div>
         }
      </React.Fragment>
    );
  }
}

export default Songcard;
