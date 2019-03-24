import React, { Component } from 'react'
import Spotify from "../services/spotifyService";

class SongTimer extends Component {

  state = {
    currentMinute: 0,
    currentSecond: 0,
    songMinute: 0,
    songSecond: 0,
    currentTime: 0,
    currentSongDuration: 0,
    percentageThroughSong: 0,
  }

  async componentDidMount() {
    this.updateTicker();
  }

  //Converts the current time to the correct format
  convertMsToTime() {
    const minutes = Math.floor((this.state.currentTime / 1000) / 60);
    const seconds = Math.round((this.state.currentTime / 1000) % 60);
    this.setState({ currentMinute: minutes, currentSecond: seconds });
  }

  //Converts the song duration into the correct format
  convertSongMsToTime() {
    const minutes = Math.floor((this.state.currentSongDuration / 1000) / 60);
    const seconds = Math.round((this.state.currentSongDuration / 1000) % 60);
    this.setState({ songMinute: minutes, songSecond: seconds });
  }

  //Updates the current time every second, and updates the slider
  async updateTicker() {
    setTimeout(() => { this.updateTicker() }, 1000);
    var newPercent = Math.round((this.state.currentTime / this.state.currentSongDuration) * 100);
    console.log(this.state.currentSecond);

    // if (this.state.isPlaying != false) {
    //   var newTime = this.state.currentTime + 1000;
    //   this.setState({currentTime: newTime});
    // }

    this.setState({ percentageThroughSong: newPercent });
    this.convertMsToTime();
    this.convertSongMsToTime()
  }

  //Called when there has been a change to the slider
  updateSongTime = () => {
    var slider = document.getElementById("timeSlider");
    var newValue = slider.value;
    var newTime = Math.floor(this.state.currentSongDuration * (newValue / 100));
    Spotify.updatePlaybackPoistion(newTime);
  }

  render() {

    const { songDuration, songPosition, isPlaying } = this.props;
    this.state.currentSongDuration = songDuration;
    this.state.isPlaying = isPlaying;
    this.state.currentTime = songPosition;

    return (
      <div className="row">
        <div className="col-1-of-4">
          <span className="right">
            {this.state.currentMinute}:
            {(this.state.currentSecond < 10) ? 0 : ''}{this.state.currentSecond}
          </span>
        </div>
        <div className="col-2-of-4">
          <input onChange={this.updateSongTime} type="range" min="1" max="100" defaultValue="0" value={this.state.percentageThroughSong} class="slider" id="timeSlider"></input>
        </div>
        <div className="col-1-of-4">
          <span>
            {this.state.songMinute}:
              {(this.state.songSecond < 10) ? 0 : ''}{this.state.songSecond}
          </span>
        </div>
      </div>

    );
  }

}

export default SongTimer;