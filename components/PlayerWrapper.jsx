import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VolumeSlider from "../components/VolumeSlider";

class PlayerWrapper extends Component {
  state = {
    currentMinute: 0,
    currentSecond: 0,
    songMinute: 0,
    songSecond: 0,
    currentTime : 0,
    currentSongDuration: 15
  }

  convertMsToTime() {
    const minutes = Math.floor((this.state.currentTime / 1000) / 60);
    const seconds = (this.state.currentTime / 1000) % 60;
    
    this.setState({currentMinute:minutes, currentSecond:seconds});
  }

  convertSongMsToTime() {
    const minutes = Math.floor((this.state.currentSongDuration / 1000) / 60);
    const seconds = Math.floor((this.state.currentSongDuration / 1000) % 60);
    
    this.setState({songMinute:minutes, songSecond:seconds});
  }

  async componentDidMount() {
    this.updateTicker();
  }

  updateTicker = () => {
    if (this.state.currentTime >= this.state.currentSongDuration) {
      this.setState({currentTime : 0});
    }
    else {
      this.setState({currentTime: this.state.currentTime + 1000});
    }
    setTimeout(() => { this.updateTicker() }, 1000);
    this.convertMsToTime();
    this.convertSongMsToTime()
  }

  render() {

    const { playing, start, skip, uri, currentSongDuration, currentSongPosition } = this.props;
    this.state.currentSongDuration = currentSongDuration;

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
          <div className="player-bottom-right"> {this.state.currentMinute}:
          {(this.state.currentSecond < 10) ? 0: ''}{this.state.currentSecond} / {this.state.songMinute}:
          {(this.state.songSecond < 10) ? 0: ''}{this.state.songSecond} </div>
        </div>
        
        
      </React.Fragment>
    );
  }
}

export default PlayerWrapper;