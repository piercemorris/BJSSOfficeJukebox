import React, { Component } from 'react'
import _ from "lodash";

class SettingsTab extends Component {

  state = {

  }

  updateExplicitToggle = () => {
    var toggle = document.getElementById("explicitToggle");
    console.log(toggle.value);
  }

  render() {

    return (
        <div>
          <div id="toggles">
            <label class="switch">
              <input type="checkbox"/>
              <span class="toggleSlider"></span> 
            </label>
            <br/>
            <label class="switch">
              <input type="checkbox"/>
              <span class="toggleSlider"></span>
            </label>
          </div>

          <p id="settingsText">
            Hide Explicit:
          </p >
          <p id="settingsText">
            Hide Remove:
          </p>

          {/* <div id="settingsText">
            Hide Explicit:
            <br/>
            Hide Remove:
          </div> */}
          
          

          {/* <div id="settingsText">
            Hide Explicit
            <br/>
            Hide Delete
          </div> */}
        </div>
    );
  }

}

export default SettingsTab;