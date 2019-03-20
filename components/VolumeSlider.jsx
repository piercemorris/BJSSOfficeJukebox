import React, { Component } from 'react'
import _ from "lodash";
import Spotify from "../services/spotifyService";

class VolumeSlider extends Component {

  state = {
    volume: null
  }

  componentWillMount = async () => {
    const response = await Spotify.getMeAndDevices();
    let highestValue = 0;
    response ?
      _.map(response.devices, (device) => {
        device.is_active ? highestValue = device.volume_percent : 0;
      }) : null;
    this.setState({ volume: highestValue });
  }

  updateVolume = () => {
    var slider = document.getElementById("myRange");
    Spotify.updatePlayVolume(slider.value);
  }

  render() {

    const { volume } = this.state;

    return (
      <div className="slidecontainer">
        {volume ? <input onChange={this.updateVolume} defaultValue={volume} type="range" min="1" max="100" className="slider" id="myRange"></input> : null}
      </div>
    );
  }

}

export default VolumeSlider;