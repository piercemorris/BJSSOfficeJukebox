import React, { Component } from 'react'
import Spotify from "../services/spotifyService";
 
class VolumeSlider extends Component {

  updateVolume = () => {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;

    Spotify.updatePlayVolume(slider.value);

  }


  render() {
    
    return (
      <div class="slidecontainer">
        <input onChange={this.updateVolume} type="range" min="1" max="100" defaultValue="50" class="slider" id="myRange"></input>
        <p>Value: <span id="demo"></span></p>
      </div>
    );
  }
  
}

export default VolumeSlider;