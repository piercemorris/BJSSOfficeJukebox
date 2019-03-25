import React, { Component } from 'react';
import song from "../services/songService";

class SongDuration extends Component {

  state = {
    currentSongDuration: 0,
    running: false,
    lapse: 0,
   }

  componentWillMount() {
    this.setState({
      running: this.props.isPlaying,
      currentSongDuration: this.props.currentSongDuration
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate() {
    const { running } = this.state;
    const { isPlaying, currentSongDuration } = this.props;

    if (running != isPlaying) {
      !running ? this.handleTimerStart() : clearInterval(this.timer);
      this.setState({ running: isPlaying });
    }
    if (currentSongDuration != this.state.currentSongDuration) {
      clearInterval(this.timer);
      this.setState({ currentSongDuration, lapse: 0, running: false });
    }
  }

  handleTimerStart = () => {
    this.setState(state => {
      if (state.running) {
        clearInterval(this.timer);
      } else {
        const startTime = Date.now() - this.state.lapse;
        this.timer = setInterval(() => {
          this.setState({
            lapse: Date.now() - startTime
           });
        });
      }
    })
  }

  render() { 

    const { currentSongDuration, lapse } = this.state;

    return (
      <div className="row">
        <div className="col-1-of-4">
          <span className="right">
            {song.msToTime(lapse)}
          </span>
        </div>
        <div className="col-2-of-4">
          <div className="duration">
            <input 
              type="range" min="0" max={this.state.currentSongDuration} 
              value={lapse}
              readOnly
              className="slider" 
              id="timeSlider" />
          </div>
        </div>
        <div className="col-1-of-4">
          <span>
           {song.msToTime(currentSongDuration)}
          </span>
        </div>
      </div>
    );
  }
}
 
export default SongDuration;