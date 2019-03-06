import React, { Component } from 'react';
import queryString from "query-string";
import Spotify from "../services/spotifyService";

class Index extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to the BJSS Office Jukebox</h1>
        <p>Your office's very own DJ, who's always taking requests!</p>
        <h3>Features:</h3>
        <ul>
          <li>Search for your favourite songs from Spotify</li>
          <li>Add them to the song queue</li>
          <li>Fair weighting</li>
            <ul>
              Those that add fewer songs get higher priority!
            </ul>
          <li>Control playback: play, pause, skip!</li>
          <li>And plenty more <b>(WIP)</b></li>
            <ul>
              <li>
                Song recommendations, for when the queue runs dry.
              </li>
              <li>
                Voice commands through Alexa.
              </li>
            </ul>
        </ul>
        <h3>How to use:</h3>
        <p>This web app will be connected to your communal area's speaker system.</p>
        <p>In order to add songs, you will need a <i>Premium</i> Spotify account. If you do not have one, you can always interact through the communal Alexa (WIP).</p>
        <h4>Viewing the queue:</h4>
        <p>This does not require a Spotify account.</p>
        <ol>
          <li>
            Step 1.
          </li>
        </ol>
        <h4>Adding songs to the queue.</h4>
        <ol>
          <li>
              Authorise your Spotify account:
          </li>
        </ol>
      </div>      
    );
  }
}

export default Index;