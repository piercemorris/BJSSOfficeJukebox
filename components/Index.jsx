import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { baseUrlLive, baseUrl } from "../config/default.json";

class Index extends Component {
  render() {
    var url = (process.env.NODE_ENV === "production" ? baseUrlLive : baseUrl);
    var text = "localhost:3000/#features";
    return (
      <div id="home">
        <div id="head" className="home-section">
          <div id="header" className="gutter">
            <span className="home-intro">Welcome to the</span>
            <b id="home-title">Office Jukebox</b>
            <span className="home-intro">Your office's very own DJ, who's always taking requests!</span>
          </div>
        </div>

        <div id="feature" className="home-section">
          <div id="header" className="gutter">
            <b id="home-title">Features</b>
          </div>
          <div className="feature-grid">
            <div className="card">
              <div className="container">
                <span className="feature-title">
                  Search songs
                </span>
                <ul>
                  <li>Search for the song you want to play</li>
                  <li>Simply add the songs by clicking the <FontAwesomeIcon icon="plus" /> icon</li>
                  <li>The songs will be added to the queue!</li>
                </ul>
              </div>
            </div>
            <div className="card">
              <div className="container">
                <span className="feature-title">
                  Fair Queue
                </span>
                <ul>
                  <li>There's a priority system so that each user will get their song played</li>
                  <li>Add too many songs and your priority will get decreased!</li>
                  <li>Wait long enough and your priority will be reset</li>
                </ul>
              </div>
            </div>
            <div className="card">
              <div className="container">
                <span className="feature-title">
                  Listen
                </span>
                <ul>
                  <li>Dedicate a device to play the queue in your social space</li>
                  <li>Play, pause, skip and control the volume on the device</li>
                  <li>Don't worry if there's only one song in the queue, our clever system will add some!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default Index;