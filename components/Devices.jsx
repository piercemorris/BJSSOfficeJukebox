import React from 'react'

const Devices = ({ user, devices }) => {
  return ( 
    <div id="device-select">
      <div className="user">
        <span>Playing on {user.display_name}'s Spotify</span>
      </div>
      <div className="select-style">
        <select>
          {devices.map(device => (
            <option key={device.id} value={device.id}>{device.name}</option>
          ))}
        </select>
      </div>
    </div>
   );
}
 
export default Devices;