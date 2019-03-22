import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VolumeSlider from "../components/VolumeSlider";
import SongTimer from "../components/SongTimer";

class PlayerWrapper extends Component {
  

  render() {

    const { playing, start, skip, uri, currentSongDuration, currentSongPosition } = this.props;

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
        <div className="player-bottom-left"> <VolumeSlider/></div>
          <div className="player-bottom-right"> <SongTimer songDuration={currentSongDuration} songPosition={currentSongPosition}/></div>
        </div>
        
        
      </React.Fragment>
    );
  }
}

export default PlayerWrapper;