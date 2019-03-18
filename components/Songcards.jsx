import React, { Component } from "react";
import _ from "lodash";
import Devices from "../components/Devices";
import PlayerWrapper from "../components/PlayerWrapper";
import Placeholder from "../components/Placeholder";
import Songcard from "./Songcard";
import Spotify from "../services/spotifyService";
import song from "../services/songService";
import Submit from "../components/common/emailButton";


class Songcards extends Component {
  state = {
    songs: null,
    spotifyData: null,
    start: false,
    playing: false,
    device: null
  };

  async componentWillMount() {
    const response = await song.getSongs();
    const spotifyData = await Spotify.getMeAndDevices();
    console.log(spotifyData);
    this.setState({ songs: response.data, spotifyData });
  }

  handleDeviceUpdate = () => {
    const selection = document.getElementById("device-selection");
    const device = selection.options[selection.selectedIndex];
    this.setState({ device });
    console.log(this.state.device);
  }

  handleFinish = async () => {
    const timeCheck = 5000;
    setTimeout(() => { this.handleFinish() }, timeCheck);
    let data = await Spotify.getCurrentlyPlaying();
    let timeRemain = data.duration - data.progress;
    console.log(timeRemain);
    if (timeRemain < timeCheck) {
      setTimeout(() => {
        this.handleNext();
      }, timeRemain);
    }
  }

  handlePlay = () => {
    if (!this.state.start) {
      this.setState({ start: true, playing: true });
      const firstInQueueURI = this.state.songs[0].song.song.uri;
      Spotify.playSong(firstInQueueURI);
      this.handleFinish();
    } else {
      Spotify.play(this.state.playing);
      this.setState({ playing: !this.state.playing });
    }
  };

  handleDelete = (id) => {
    const songs = _.filter(this.state.songs, song => { return song._id !== id });
    this.state = { songs };
    this.setState({ songs });
    song.deleteSong(id);
  }

  handleNext = () => {
    this.handleDelete(this.state.songs[0]._id);
    this.state.songs[0].song.song.uri
      ? Spotify.playSong(this.state.songs[0].song.song.uri)
      : null;
  }

  handleSubmit = async e => {
    e.preventDefault();
  };

  /*
    for devices

    {spotifyData
          ?
          <Devices handleUpdate={this.handleDeviceUpdate} user={spotifyData.body} devices={spotifyData.devices} />
          :
          <p>Authorise Spotify!</p>
        }

    {!song.areSongs(songs)
          ?
          <React.Fragment>
            <Placeholder />
          </React.Fragment>
          :

    <PlayerWrapper playing={this.state.playing} start={this.handlePlay}
          skip={this.handleNext} uri={songs[0].song.song.uri}>
          <Songcard
            currentSong="true"
            songObj={songs[0]}
            onDelete={this.handleNext}
            priority={songs[0].priority}
          />
        </PlayerWrapper>

      {!song.areSongsInQueue(songs)
          ?
          <Placeholder />
          :
          songs
            .filter(song => songs.indexOf(song) != 0)
            .map(song => (
              <Songcard
                songObj={song}
                onDelete={this.handleDelete}
                priority={song.priority}
                key={song._id}
              />

            ))
        }

        <h1>{this.state.songs[0].song.song.name}</h1>
  */


  render() {
    const { songs, spotifyData } = this.state;
    return (
      <div className="queue-page">
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
                      <div className="text-box__explicit">
                        <span className="text-box__explicit-text">explicit</span>
                      </div>
                      <span className="text-box__song-artist">{songs[0].song.song.artists[0].name}</span>
                      <span className="text-box__song-album">{songs[0].song.song.album.name}</span>
                    </h2>
                  </div>
                </div>
              </div>

              <div className="playback-controls">
              </div>
            </section>

            <section className="queue">
              <h1 className="queue-title">
                Up Next
              </h1>
              <table className="queue__table">
                <tr className="queue__table-header">
                  <th className="queue__table-header-img"></th>
                  <th className="queue__table-header-title">Title</th>
                  <th className="queue__table-header-artist">Artist</th>
                  <th className="queue__table-header-album">Album</th>
                  <th className="queue__table-header-username">Requested By</th>
                  <th className="queue__table-header-priority">Priority</th>
                  <th className="queue__table-header-button"></th>
                </tr>
                <tr className="queue__table__content">
                  <td className="queue__table-image">
                    <img
                      className="queue__table-image-img"
                      src={songs[0].song.song.album.images[1].url}
                      alt="song in queue"
                    />
                  </td>
                  <td>{songs[0].song.song.name}</td>
                  <td>{songs[0].song.song.artists[0].name}</td>
                  <td>{songs[0].song.song.album.name}</td>
                  <td>{songs[0].username}</td>
                  <td>{songs[0].priority}</td>
                  <td></td>
                </tr>
              </table>
            </section>
          </>
          :
          <section>
            No songs
          </section>
        }
      </div>
    );
  }
}

export default Songcards;
