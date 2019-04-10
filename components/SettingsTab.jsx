import React, { Component } from 'react'
import _ from "lodash";

class SettingsTab extends Component {

  state = {
  }


  render() {

    return (
        <div>
          <div id="toggles">
            <label class="switch">
              <input type="checkbox" id="explicitToggle" value="explicitToggle" onChange={this.props.handler} />
              <span class="toggleSlider"></span> 
            </label>
            <br/>
            <label class="switch">
              <input type="checkbox" id="deleteToggle" value="deleteToggle" onChange={this.props.handler} />
              <span class="toggleSlider"></span>
            </label>
          </div>

          <p id="settingsText">
            Hide Explicit:
          </p >
          <p id="settingsText">
            Hide Remove:
          </p>

          <p id= "settingsText">
            {this.state.contValue}
          </p>
        </div>
    );
  }

}

export default SettingsTab;