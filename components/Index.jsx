import React, { Component } from 'react';
import queryString from "query-string";
import Spotify from "../services/spotifyService";
import { baseUrlLive, baseUrl } from "../config/default.json";

class Index extends Component {
  render() {
    var url = (process.env.NODE_ENV === "production" ? baseUrlLive : baseUrl);
    var text = "localhost:3000/#features";
    return (
      <div>
        <h1>Welcome to the <b>BJSS Office Jukebox</b></h1>
        <p>Your office's very own DJ, who's always taking requests!</p>
        <div className="contentsMenu">
          <span>
            <p>
              <b>Contents: </b>
              <ul>
                <li><a href={url + "/#features"}><b>Features</b></a></li>
                <li><a href={url + "/#howto"}><b>User Guide</b></a></li>
                <ul>
                  <li><a href={url + "/#withoutSpotify"}>Without a Spotify Premium account</a></li>
                  <li><a href={url + "/#withSpotify"}>With a Spotify Premium account</a></li>
                </ul>
              </ul>
            </p>
          </span>
        </div>
        <h3 id="features"><b>Features:</b></h3>
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
              <li>
                View various interesting statistics (and judge your colleague's taste).
              </li>
            </ul>
        </ul>
        <hr/>
        <h3 id="howto"><b>How to use:</b></h3>
        <p>This web app will play songs through your communal area's speaker system.</p>
        <p>In order to search for songs to add, you will need a Spotify <i>Premium</i> account. If you do not have one, you can always interact through the communal Alexa device <b>(WIP)</b>.</p>
        <h4 id="withoutSpotify"><i>"I <b>don't</b> have a Spotify Premium account"</i></h4>
        <p>Many features are still available!</p>
        <ul>
          <li>
            <b>View the queue:</b> select 'Queue' from the top navigation bar.
          </li>
          <li>
            <b>View statistics:</b> select 'Stats' from the top navigation bar. <b>(WIP)</b>
          </li>
        </ul>
        <h4 id="withSpotify"><i>"I <b>do</b> have a Spotify Premium account"</i></h4>
        <p>You just need to sign up, and then authorise your Spotify account.</p>
        <ol>
          <li>
            <b>Sign up:</b>
            <ul>
              <p>
                Create a new 'user' by clicking 'Sign Up', and filling in the form. Your password will be hashed, only you will know it!
              </p>
            </ul>
          </li>
          <li>
              <b>Authorise your Spotify account:</b>
              <ul>
                <p>
                  If this is your first time using the Jukebox, you will need to connect to your Spotify account. <br/>
                  So, simple click on 'Authorise Spotify', in the upper navigation bar. <br/>
                  This will redirect you to a screen where you can enter your Spotify details (don't worry, they are not stored anywhere on this app).<br/>
                </p>
              </ul>
          </li>
          <li>
            <b>Add songs to the queue:</b>
            <ul>
              <p>
                Navigate to 'Search'. Use the search bar to find the song you fancy.
                From the search results, find your song, and click the '+'. The song is now queued!
              </p>
            </ul>
          </li>
        </ol>
      </div>      
    );
  }
}

export default Index;