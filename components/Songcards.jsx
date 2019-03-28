import React, { Component } from "react";
import Link from "next/link";
import _ from "lodash";
import Error from "./common/Error";
import CurrentlyPlaying from "./queue/CurrentlyPlaying";
import Queue from "./queue/Queue";
import Spotify from "../services/spotifyService";
import song from "../services/songService";
import user from "../services/userService";


class Songcards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      songs: null,
      start: false,
      loading: true,
      playing: false,
      isDevice: false,
      isDeviceActive: false,
      unauthorised: false,
      spotifyData: null,
      currentSongDuration: 0
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
      this.handleQueueUpdate();
    } catch (ex) {
      this.setState({ loading: false, unauthorised: true });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.finishTimer);
    clearTimeout(this.nextSong);
    clearInterval(this.updateQueue);
  }

  handleDeviceActive = (devices) => {
    let deviceActive = false;
    _.map(devices, device => {
      if (device.is_active)
        deviceActive = true;
    });
    this.setState({ isDeviceActive: deviceActive });
  }

  updateSongQueue = async () => {
    const firstSong = this.state.songs[0];
    const response = await song.getSongs();
    let newSongs = response.data;
    newSongs.unshift(firstSong);
    this.setState({ songs: newSongs });
  }

  handleQueueUpdate = async () => {
    this.updateQueue = setInterval( async () => {
      console.log("set interval started");
      const frozen = _.take(this.state.songs, 3);
      const { data: updatedSongList } = await song.getSongs();
      
      console.log("frozen", frozen);
      console.log("new database call", updatedSongList);
      console.log("current state", this.state.songs);
      console.log("difference ", _.differenceBy(updatedSongList, frozen, '_id'));
      if(this.state.songs.length !== updatedSongList.length) {
        let newFreeQueue = _.differenceBy(updatedSongList, frozen, '_id');
        console.log("should be everything but top 3", newFreeQueue);
        newFreeQueue = _.orderBy(newFreeQueue, ['priority'], ['desc']);
        const newQueue = frozen.concat(newFreeQueue);
        this.setState({ songs: newQueue });
      }
      console.log("set interval finished");
    }, 10 * 1000);
  }

  handleCurrentUpdate = async () => {

  }

  handleDeviceUpdate = () => {
    const selection = document.getElementById("device-selection");
    const device = selection.options[selection.selectedIndex];
    this.setState({ device });
  }

  handleFinish = async () => {
    const timeCheck = 5000;

    this.finishTimer = setTimeout(() => { this.handleFinish() }, timeCheck);
    let data = await Spotify.getCurrentlyPlaying();
    this.setState({ currentSongPosition: data.progress });
    let timeRemain = data.duration - data.progress;
    console.log(timeRemain);
    if (timeRemain < timeCheck) {
      this.nextSong = setTimeout(() => {
        this.handleNext();
      }, timeRemain);
    }
  }

  handlePlay = () => {
    if (!this.state.start) {
      const firstInQueueURI = this.state.songs[0].song.song.uri;
      this.setState({ currentSongDuration: this.state.songs[0].song.song.duration_ms });
      Spotify.playSong(firstInQueueURI);
      console.log(this.state.songs[0].song.song);

      this.setState({
        start: true,
        playing: true
      });

      this.handleFinish();
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

  handleDelete = (id) => {
    const songs = _.filter(this.state.songs, song => { return song._id !== id });
    this.state = { songs };
    this.setState({ songs });
    song.deleteSong(id);
  }

  handleNext = () => {
    this.handleDelete(this.state.songs[0]._id);
    this.updateSongQueue();
    if (this.state.songs[0]) {
      const firstInQueueURI = this.state.songs[0].song.song.uri;
      Spotify.playSong(firstInQueueURI);
      this.setState({ currentSongDuration: this.state.songs[0].song.song.duration_ms });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
  };

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