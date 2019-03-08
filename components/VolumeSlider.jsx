import React, { Component } from 'react'
import Spotify from "../services/spotifyService";
 
class VolumeSlider extends Component {

  updateVolume = () => {
    var slider = document.getElementById("myRange");
    output.innerHTML = slider.value;

    Spotify.updatePlayVolume(slider.value);

  }


  render() {
    
    return (
      <div class="slidecontainer">
        <input onChange={this.updateVolume} type="range" min="1" max="100" defaultValue="50" class="slider" id="myRange"></input>
      </div>
    );
  }
  
}

export default VolumeSlider;