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
          <input onChange={this.updateExplicitToggle}type="checkbox" id="explicitToggle"/> Show Explicit <br/>
          <br/>
          <input type="checkbox" class="toggle" value="Bike"/> Show Delete 
        </div>
    );
  }

}

export default SettingsTab;