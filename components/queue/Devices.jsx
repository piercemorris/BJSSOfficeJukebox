import React from 'react'

const Devices = ({ user, devices, handleUpdate }) => {
  return (
    <div id="device-select">
      <div className="user">
        <span>Playing on {user.display_name}'s Spotify, on </span>
      </div>
      {devices.length === 0
        ?
        <a href="https://open.spotify.com/" target="_blank">Open Spotify</a>
        :
        <div className="select-style">
          <select onChange={handleUpdate} id="device-selection">
            {devices.map(device => (
              <option key={device.id} value={device.id}>{device.name}</option>
            ))}
          </select>
        </div>
      }
    </div>
  );
}

export default Devices;