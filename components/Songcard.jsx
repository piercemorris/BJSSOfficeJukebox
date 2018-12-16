import React, { Component } from "react";

class Songcard extends Component {
  state = {
    song: null
  };

  componentDidMount() {
    this.setState({ song: this.props.song });
  }

  render() {
    const song = this.state.song;
    const priority = this.props.priority;
    const colour = "priority-" + priority + " card-body";

    return (
      <div className="card song-card">
        <table className="card-table" width="100%">
          {this.state.song && (
            <tr>
              <th width="121" className="card-image">
                <img
                  className="card-art"
                  src={song.album.images[1].url}
                  width="121"
                />
              </th>
              <th className={colour + " card-header-body"}>
                <div id="text">
                  <p className="card-priority">
                    Priority   <div class="circle"></div>
                  </p>
                  <h5 className="card-title">{song.name}</h5>
                  <h6 className="card-subtitle mb-2">
                    {song.album.name + ", " + song.artists[0].name}
                  </h6>
                  <a href="#" className="card-link">
                    More info
                  </a>
                  <p className="card-text song-card-user">
                    Requested by: a user
                  </p>
                </div>
              </th>
            </tr>
          )}
        </table>
      </div>
    );
  }
}

export default Songcard;
