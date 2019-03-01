import React, { Component } from 'react';

class SpotifyMeta extends Component {
  state = {}
  render() {
    return (
      <div>
        <p>{this.props.user.display_name}</p>
        {this.props.devices.map(device => (
          <div key={device.id}>
            <p>{device.id}</p>
            <p>{device.name}</p>
            <p>{device.type}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default SpotifyMeta;