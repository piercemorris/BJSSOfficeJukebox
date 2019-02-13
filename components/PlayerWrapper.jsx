import React, { Component } from 'react';

class PlayerWrapper extends Component {
  state = {}
  render() {

    const { playing, start, skip, uri } = this.props;

    return (
      <React.Fragment>
        <div className="player-container">
          <button className="player-btn-left" onClick={() => start(uri)}>{playing ? "Pause" : "Play"}</button>
          <button className="player-btn-right" onClick={() => skip()}>Skip</button>
        </div>
        <div className="current-play">
          {this.props.children}
        </div>
        <div className="player-container">
          <button className="player-btn-bottom">Song duration</button>
        </div>
      </React.Fragment>
    );
  }
}

export default PlayerWrapper;