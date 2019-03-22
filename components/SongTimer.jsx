import React, { Component } from 'react'
import Spotify from "../services/spotifyService";
 
class SongTimer extends Component {

    state = {
        currentMinute: 0,
        currentSecond: 0,
        songMinute: 0,
        songSecond: 0,
        currentTime : 0,
        currentSongDuration: 0,
        percentageThroughSong : 0
      }

    async componentDidMount() {
      this.updateTicker();
    }
    
    convertMsToTime() {
      const minutes = Math.floor((this.state.currentTime / 1000) / 60);
      const seconds = Math.floor((this.state.currentTime / 1000) % 60);
      this.setState({currentMinute:minutes, currentSecond:seconds});
    }
    
    convertSongMsToTime() {
      const minutes = Math.floor((this.state.currentSongDuration / 1000) / 60);
      const seconds = Math.floor((this.state.currentSongDuration / 1000) % 60);
      this.setState({songMinute:minutes, songSecond:seconds});
    }

    async updateTicker()  {
      setTimeout(() => { this.updateTicker() }, 1000);
      var newPercent = Math.floor((this.state.currentTime / this.state.currentSongDuration) * 100 );
      this.setState({percentageThroughSong : newPercent});
      this.convertMsToTime();
      this.convertSongMsToTime()
      }

  updateSongTime = () => {
    var slider = document.getElementById("timeSlider");
    var newValue = slider.value;
    var newTime = Math.floor(this.state.currentSongDuration * (newValue / 100));
    Spotify.updatePlaybackPoistion(newTime);
  }

  render() {

    const {songDuration, songPosition } = this.props;
    this.state.currentSongDuration = songDuration;
    this.state.currentTime = songPosition;
    
    return (
        <div>
            {this.state.currentMinute}:
            {(this.state.currentSecond < 10) ? 0: ''}{this.state.currentSecond} 
            <div class="slidecontainer">
              <input onChange={this.updateSongTime} type="range" min="1" max="100" defaultValue="0" value = {this.state.percentageThroughSong}class="slider" id="timeSlider"></input>
            </div>
            {this.state.songMinute}:
            {(this.state.songSecond < 10) ? 0: ''}{this.state.songSecond}
        </div>
        
    );
  }
  
}

export default SongTimer;