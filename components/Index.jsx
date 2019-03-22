import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { baseUrlLive, baseUrl } from "../config/default.json";

class Index extends Component {
  render() {
    return (
      <div className="home-page">

        <section className="home-section">
          <div className="gutter header">
            <span className="home-intro">Welcome to the</span>
            <b className="home-title">Office Jukebox</b>
            <span className="home-intro">Your office's very own DJ, who's always taking requests!</span>
          </div>
        </section>

        <section id="feature" className="home-section">
          <div className="gutter header">
            <b className="home-title">Features</b>
            <span className="home-intro">A multiuser song playing and queueing system.</span>
          </div>
          <div className="feature-grid">
            <div>
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
            <div>
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
            <div>
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
        </section>

        <section id="how-to" className="home-section">
          <div className="gutter header">
            <b className="home-title">How To Use</b>
            <span className="home-intro">How to user the system effectively.</span>
          </div>

          <div className="home-section--desc">
            <p className="gutter extra-pad">
              This web app will play through your social space speaker system.
              To get the most out of the functionality this provides, follow these steps:
            </p>
            <ol className="extra-pad">
              <li>
                <b>Sign up:</b>
                <p>
                  Create a new 'user' by clicking 'Sign Up', and filling in the form. Your password will be hashed, only you will know it!
              </p>
              </li>
              <li>
                <b>Authorise your Spotify account:</b>
                <p>
                  If this is your first time using the Jukebox, you will need to connect to your Spotify account. <br />
                  So, simple click on 'Authorise Spotify', in the upper navigation bar. <br />
                  This will redirect you to a screen where you can enter your Spotify details (don't worry, they are not stored anywhere on this app).<br />
                </p>
              </li>
              <li>
                <b>Add songs to the queue:</b>
                <p>
                  Navigate to 'Search'. Use the search bar to find the song you fancy.
                  From the search results, find your song, and click the '+'. The song is now queued!
              </p>
              </li>
            </ol>
          </div>
        </section>
      </div>
    );
  }
}

export default Index;