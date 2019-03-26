import React, { Component } from "react";
import Link from "next/link";
import _ from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from "./common/Button";
import VolumeSlider from "../components/VolumeSlider";
import SongDuration from "../components/SongDuration";
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
      this.setState({ currentSongDuration: this.state.songs[0].song.song.duration_ms});
    } catch (ex) {
      this.setState({ loading: false, unauthorised: true });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.finishTimer);
    clearTimeout(this.nextSong);
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
    const response = await song.getSongs();
    this.setState({ songs: response.data });
  }

  updateCurrentSongDuration = () => {
    this.setState({
      currentSongDuration: this.state.songs[0].song.song.duration_ms,
    });
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
      this.updateCurrentSongDuration();
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
          <section className="authorise-page">
            <div className="authorise-page__text-box">
              <h1 className="authorise-page__heading">
                <span className="authorise-page__heading--main">Loading the queue, hang on!</span>
                <span className="authorise-page__heading--sub">
                  <img className="authorise-page__heading--logo" src="static/img/jukebox-logo-icon-white.png" alt="" />
                </span>
              </h1>
            </div>
          </section>
          :
          <>
            {song.areSongs(songs) ?
              <>
                <section className="currently-playing">
                  <div className="currently-playing__song-info">
                    <div className="row">
                      <div className="col-1-of-3">
                        <div className="currenty-playing__image">
                          <img
                            className="currently-playing__image-img"
                            src={songs[0].song.song.album.images[1].url}
                          />
                        </div>
                      </div>
                      <div className="col-2-of-3">
                        <h2 className="text-box">
                          <span className="now-playing">Now Playing</span>
                          <span className="text-box__song-name">{songs[0].song.song.name}</span>
                          {songs[0].song.song.explicit ?
                            <div className="text-box__explicit">
                              <span className="text-box__explicit-text">explicit</span>
                            </div> : null
                          }
                          <span className="text-box__song-artist">{songs[0].song.song.artists[0].name}</span>
                          <span className="text-box__song-album">{songs[0].song.song.album.name}</span>
                        </h2>
                        <div className="margin-top-sm">
                          <Button onDelete={this.handleNext} song={songs[0]} text="Remove" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {isDevice ?
                    <>
                      {isDeviceActive ?
                        <div className="playback-controls">
                          <div className="row">
                            <div>
                            { currentSongDuration ?
                              <>
                              {!this.state.playing ?
                                  <div className="playback-controls__play">
                                    <FontAwesomeIcon onClick={() => this.handlePlay()} className="playback-controls__button" icon={['far', 'play-circle']} size="3x" inverse={true} />
                                  </div>
                                  :
                                  <div className="playback-controls__play">
                                    <FontAwesomeIcon onClick={() => this.handlePlay()} className="playback-controls__button" icon={['far', 'pause-circle']} size="3x" inverse={true} />
                                  </div>
                                }
                                <div className="playback-controls__duration">
                                  <SongDuration currentSongDuration={currentSongDuration} isPlaying={playing}/>
                                </div>
                                <div className="playback-controls__volume">
                                  <VolumeSlider />
                                </div>
                              </>
                              :
                                null
                              }
                            </div>
                          </div>
                        </div>
                        :
                        <div className="no-device">
                          No active Spotify is open on the device account!
                          <a href="https://open.spotify.com/browse/featured" target="_blank" className="btn btn-standard margin-text-sm">Open Spotify</a>
                        </div>
                      }
                    </>
                    :
                    <div className="no-device">
                      Playback features can changed on the device playing the music
                    </div>
                  }
                </section>

                <section className="queue">
                  <h1 className="queue-title">Up Next</h1>
                  <table className="queue__table">
                    <tbody>
                      <tr className="queue__table-header">
                        <th className="queue__table-header-img"></th>
                        <th className="queue__table-header-title">Title</th>
                        <th className="queue__table-header-artist">Artist</th>
                        <th className="queue__table-header-album">Album</th>
                        <th className="queue__table-header-username">Requested By</th>
                        <th className="queue__table-header-priority">Priority</th>
                        <th className="queue__table-header-button"></th>
                      </tr>
                      {!song.areSongsInQueue(songs) ?
                        null
                        :
                        songs
                          .filter(song => songs.indexOf(song) != 0)
                          .map(song => (
                            <tr key={song._id} className="queue__table__content">
                              <td className="queue__table-image">
                                <img
                                  className="queue__table-image-img"
                                  src={song.song.song.album.images[1].url}
                                  alt="song in queue"
                                />
                              </td>
                              <td>
                                {song.song.song.name}
                                {song.song.song.explicit ?
                                  <span className="text-box__explicit--short">E</span>
                                  : null
                                }
                              </td>
                              <td>{song.song.song.artists[0].name}</td>
                              <td>{song.song.song.album.name}</td>
                              <td>{song.username}</td>
                              <td>{parseFloat(Math.round(song.priority * 100) / 100).toFixed(2)}</td>
                              <td>
                                <Button onDelete={this.handleDelete} song={song} text="Remove" className="bottom" />
                              </td>
                            </tr>
                          ))
                      }
                    </tbody>
                  </table>
                </section>
              </>
              :
              <section className="authorise-page">
                {
                  unauthorised ?
                    <div className="authorise-page__text-box">
                      <h1 className="authorise-page__heading">
                        <span className="authorise-page__heading--main">Hey, where's the tunes?!</span>
                        <span className="authorise-page__heading--sub">
                          Authorise Spotify, add songs and they'll appear in the queue
                        </span>
                      </h1>
                      <Link href="/api/spotify/login">
                        <button className="authorise-page__button">
                          Authorise Spotify
                      </button>
                      </Link>
                    </div>
                    :
                    <div className="authorise-page__text-box">
                      <h1 className="authorise-page__heading">
                        <span className="authorise-page__heading--main">Hey, where's the tunes?!</span>
                        <span className="authorise-page__heading--sub">
                          Add songs to the Queue with the search bar!
                        </span>
                      </h1>
                    </div>
                }
              </section>
            }
          </>
        }
      </div>
    );
  }
}

export default Songcards;
