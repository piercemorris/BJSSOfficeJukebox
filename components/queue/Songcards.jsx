import React, { Component } from "react";
import Link from "next/link";
import _ from "lodash";
import Error from "../Common/Error";
import Timer from "../Common/Timer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CurrentlyPlaying from "./CurrentlyPlaying";
import SettingsTab from "./SettingsTab";
import Queue from "./Queue";
import Spotify from "../../services/spotifyService";
import song from "../../services/songService";
import user from "../../services/userService";


class Songcards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      songs: null,
      start: false,
      loading: true,
      playing: false,
      updateTime: 10 * 1000,
      isDevice: false,
      isDeviceActive: false,
      unauthorised: false,
      spotifyData: null,
      currentSongDuration: 0,
      hideExplicit: false,
      hideDelete: false
    };
  }

  async componentWillMount() {
    const userInfo = user.getCurrentUser();
    let isDevice = false;
    if (userInfo) {
      isDevice = userInfo.isDevice ? true : false;
    }
    this.setState({ user: userInfo, isDevice });

    try {
      const response = await song.getSongs();
      const spotifyData = await Spotify.getMeAndDevices();
      this.handleDeviceActive(spotifyData.devices);
      this.setState({ songs: response.data, spotifyData, loading: false, unauthorised: false });
      this.setState({ currentSongDuration: this.state.songs[0].song.song.duration_ms });
    } catch (ex) {
      this.setState({ loading: false, unauthorised: true });
    }
  }

  // clears any timeouts/intervals set just before the component is removed
  componentWillUnmount() {
    clearTimeout(this.finishTimer);
    clearTimeout(this.nextSong);
  }

  // checks if a Spotify device is active
  handleDeviceActive = (devices) => {
    let deviceActive = false;
    _.map(devices, device => {
      if (device.is_active)
        deviceActive = true;
    });
    this.setState({ isDeviceActive: deviceActive });
  }

  // updates the queue 
  handleQueueUpdate = async () => {
    const { data: updatedSongList } = await song.getSongs();
    this.setState({ songs: updatedSongList });
  }

  // updates the currently selected device
  handleDeviceUpdate = () => {
    const selection = document.getElementById("device-selection");
    const device = selection.options[selection.selectedIndex];
    this.setState({ device });
  }

  // plays/pauses the current song
  handlePlay = () => {
    if (!this.state.start) {
      const firstInQueueURI = this.state.songs[0].song.song.uri;
      this.setState({ currentSongDuration: this.state.songs[0].song.song.duration_ms });
      Spotify.playSong(firstInQueueURI);

      this.setState({ start: true, playing: true });
    } else {
      if (this.state.playing) {
        Spotify.pause();
      } else {
        const firstInQueueID = this.state.songs[0].song.song.id;
        Spotify.resume(firstInQueueID);
      }
      this.setState({ playing: !this.state.playing });
    }
  }

  // deletes a song with the given id
  handleDelete = (id) => {
    const songs = _.filter(this.state.songs, song => { return song._id !== id });
    this.state = { songs };
    this.setState({ songs });
    song.deleteSong(id);
  }

  // handles the next song to be played in queue
  handleNext = () => { // check
    if (this.state.songs[1]) {
      this.setState({ playing: false });
      this.handleDelete(this.state.songs[0]._id);
      if (this.state.songs[0]) {
        const firstInQueueURI = this.state.songs[0].song.song.uri;
        Spotify.playSong(firstInQueueURI);
        this.setState({ currentSongDuration: this.state.songs[0].song.song.duration_ms, playing: true });
      }
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
  };

  updateToggles = () => {
    var toggle = document.getElementById("explicitToggle");
    this.setState({ hideExplicit: toggle.checked });
    if (toggle.checked && this.state.songs[0].song.song.explicit) {
      this.handleNext();
    }

    var toggle2 = document.getElementById("deleteToggle");
    this.setState({ hideDelete: toggle2.checked });
  }

  // renders this component
  render() {
    const { songs, loading, isDevice, isDeviceActive, unauthorised, currentSongDuration, currentSongPosition, playing } = this.state;
    return (
      <div className="queue-page">
        {loading ?
          <Error
            text="Loading the queue, hang on!"
            subtext={<img className="authorise-page__heading--logo" src="static/img/jukebox-logo-icon-white.png" alt="" />}
          />
          :
          <>
            {song.areSongs(songs) ?
              <>
                <div className="settings__divider">
                  <FontAwesomeIcon onClick={this.showSettings} icon={['fas', 'cog']} size="1x" inverse={true} />
                  <div className="settings__panel">
                    <SettingsTab handler={this.updateToggles} />
                  </div>
                </div>
                <CurrentlyPlaying
                  track={songs[0]}
                  playing={playing}
                  onNext={this.handleNext}
                  onDelete={this.handleDelete}
                  onPlay={this.handlePlay}
                  isDevice={isDevice}
                  isDeviceActive={isDeviceActive}
                  currentSongDuration={currentSongDuration}
                />
                <Timer time={this.state.updateTime} onUpdate={this.handleQueueUpdate} />
                <Queue
                  tracks={songs}
                  onDelete={this.handleDelete}
                />
              </>
              :
              <>
                {
                  unauthorised ?
                    <Error text="Hey, where's the tunes?!" subtext="Authorise Spotify, add songs and they'll appear in the queue">
                      <Link href="/api/spotify/login">
                        <button className="authorise-page__button">
                          Authorise Spotify
                        </button>
                      </Link>
                    </Error>
                    :
                    <Error text="Hey, where's the tunes?!" subtext="Add songs to the Queue with the search bar!" />
                }
              </>
            }
          </>
        }
      </div>
    );
  }
}

export default Songcards;