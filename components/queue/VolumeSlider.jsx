import React, { Component } from 'react'
import _ from "lodash";
import Spotify from "../../services/spotifyService";

/**
 * @api {Class Component} <VolumeSlider|currentSongDuration|isPlaying|handleNext/> queue/VolumeSlider.jsx
 * @apiName VolumeSlider
 * @apiGroup Components
 * @apiDescription  This component is responsible for handling the volume slider. This changes the volume for the authorised Spotify account
 *                  
 * @apiSuccessExample PlaybackControls.jsx
 *    <VolumeSlider />
 */
class VolumeSlider extends Component {

  state = {
    volume: null
  }

  // get the current volume from Spotify
  componentWillMount = async () => {
    const response = await Spotify.getMeAndDevices();
    let highestValue = 0;
    response ?
      _.map(response.devices, (device) => {
        device.is_active ? highestValue = device.volume_percent : 0;
      }) : null;
    this.setState({ volume: highestValue });
  }

  // updates volume on slider
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