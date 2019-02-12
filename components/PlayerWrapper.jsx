import React, { Component } from 'react';

class PlayerWrapper extends Component {
  state = {}
  render() {

    const { play, start, pause, uri } = this.props;

    return (
      <React.Fragment>
        <div className="player-container">
          <button className="player-btn-left" onClick={() => start()}>Play</button>
          <button className="player-btn" onClick={() => play()}>Resume</button>
          <button className="player-btn-right" onClick={() => pause()}>Pause</button>
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