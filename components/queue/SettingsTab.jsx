import React, { Component } from 'react'
import _ from "lodash";

/**
 * @api {Class Component} <SettingsTab|handler/> queue/SettingsTab.jsx
 * @apiName SettingsTab
 * @apiGroup Components
 * @apiParam {Function} handler Function to call if any of the toggles have been updated
 * @apiDescription  This is for the control panel, calling the functions which have been passed to it from it's parent Songcards
 * @apiSuccessExample Songcards.jsx
 *    <SettingsTab 
 *    handler = {this.updateToggles}
 *    />      
 */
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
            <br/>
            <label className="settings__switch">
              <input type="checkbox" id="queueToggle" value="queueToggle" onChange={this.props.handler} />
              <span className="settings__slider"></span>
            </label>
          </div>

          <p className="settings__text">
            Hide Explicit:
          </p>
          <p className="settings__text">
            Hide Remove:
          </p>
          <p className="settings__text">
            Hide Queue:
          </p>

        </div>
    );
  }

}

export default SettingsTab;
