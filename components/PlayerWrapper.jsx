import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PlayerWrapper extends Component {
  state = {}
  render() {

    const { playing, start, skip, uri } = this.props;

    return (
      <React.Fragment>
        <div className="player-container">
          <button className="player-btn-left" onClick={() => start(uri)}>
            {playing ? <FontAwesomeIcon icon="pause" /> : <FontAwesomeIcon icon="play" />}
          </button>
          <button className="player-btn-right" onClick={() => skip()}>
            <FontAwesomeIcon icon="forward" />
          </button>
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