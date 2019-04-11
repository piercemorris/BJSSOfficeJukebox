import React, { Component } from 'react'
import _ from "lodash";

class SettingsTab extends Component {

  render() {

    return (
        <div>
          <div className="settings__toggleSwitches">
            <label className="settings__switch">
              <input type="checkbox" id="explicitToggle" value="explicitToggle" onChange={this.props.handler} />
              <span className="settings__slider"></span> 
            </label>
            <br/>
            <label className="settings__switch">
              <input type="checkbox" id="deleteToggle" value="deleteToggle" onChange={this.props.handler} />
              <span className="settings__slider"></span>
            </label>
          </div>

          <p className="settings__text">
            Hide Explicit:
          </p >
          <p className="settings__text">
            Hide Remove:
          </p>

        </div>
    );
  }

}

export default SettingsTab;