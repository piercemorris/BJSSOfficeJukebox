import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { baseUrlLive, baseUrl } from "../config/default.json";

class Index extends Component {
  render() {
    return (
      <div className="home-page">

        <section className="home-first-section">
          <div className="gutter header">
            <img className="home-logo center pad-top" src="static/img/jukebox-logo-white.png" />
            <span className="welcome-intro pad-top pad-bottom">Your office's very own DJ, who's<br />always taking requests!</span>
            <form action="./signup">
              <button className="home-page__button">sign up</button>
            </form>
          </div>
        </section>

        <section id="feature">
          <div className="gutter header">
            <b className="home-title pad-top pad-bottom">Features</b>
            <span className="home-intro pad-bottom">A multiuser song playing and queueing system.</span>
          </div>
          <div className="feature-grid">
            <div>
              <div className="container">
              <div className="icon pad-bottom"><img src="static/img/search-song-icon.png"></img></div>
                <span className="feature-title pad-bottom">
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
                <div className="icon pad-bottom"><img src="static/img/fair-queue-icon.png"></img></div>
                <span className="feature-title pad-bottom">
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
                <div className="icon pad-bottom"><img src="static/img/listen-icon.png"></img></div>
                <span className="feature-title pad-bottom">
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

        <section id="how-to">
          <div className="gutter header">
            <b className="home-title pad-top pad-bottom">How To Use Office Jukebox...</b>
          </div>

          <div className="feature-grid">
             <div>
                <div className="container">
                    <div className="how-to-icon pad-bottom"><img src="static/img/sign-up-icon.png"></img></div>
                    <div className="how-to-titles pad-bottom"><b>Sign up</b></div>
                    <p>
                     <ul>
                      <li>Create a new 'user' by clicking 'Sign Up', and filling in the form.</li>
                      <li>Your password will be hashed, only you will know it!</li>
                      </ul>
                  </p>
                </div>
              </div>
              <div>
                <div className="container">
                <div className="how-to-icon pad-bottom"><img src="static/img/spotify-icon.png"></img></div>

                <div className="how-to-titles pad-bottom"><b>Authorise Spotify</b></div>
                      <p>
                        <ul>
                          <li>If this is your first time using the Jukebox, you will need to connect to your Spotify account.</li>
                          <li>So, simple click on 'Authorise Spotify', in the upper navigation bar. </li>
                          <li>This will redirect you to a screen where you can enter your Spotify details (don't worry, they are not stored anywhere on this app).</li>
                        </ul>
                      </p>
                </div>
              </div>
              <div>
              <div className="container">
              <div className="how-to-icon pad-bottom"><img src="static/img/add-songs-icon.png"></img></div>

              <div className="how-to-titles pad-bottom"><b>Add songs</b></div>
                    <p>
                      <ul>
                        <li>Navigate to 'Search'. Use the search bar to find the song you fancy.</li>
                        <li>From the search results, find your song, and click the '+'. The song is now queued!</li>
                      </ul>
                  </p>
                </div>
              </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Index;