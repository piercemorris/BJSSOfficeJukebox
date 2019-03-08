import React, { Component } from 'react';
import VolumeSlider from "../components/VolumeSlider";

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
          <div className="player-bottom-left"> <VolumeSlider/></div>
          <div className="player-bottom-right">Song duration</div>
        </div>
        
        
      </React.Fragment>
    );
  }
}

export default PlayerWrapper;