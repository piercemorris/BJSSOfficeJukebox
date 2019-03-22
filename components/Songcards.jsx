import React, { Component } from "react";
import _ from "lodash";
import Devices from "../components/Devices";
import PlayerWrapper from "../components/PlayerWrapper";
import Placeholder from "../components/Placeholder";
import Songcard from "./Songcard";
import Spotify from "../services/spotifyService";
import song from "../services/songService";

class Songcards extends Component {
  state = {
    songs: null,
    spotifyData: null,
    start: false,
    playing: false,
    currentSongDuration: 0,
    currentSongPosition: 0
  };

  async componentDidMount() {
    const response = await song.getSongs();
    const spotifyData = await Spotify.getMeAndDevices();
    this.setState({ songs: response.data, spotifyData });
    this.updateCurrentSongDuration();
  }

  updateCurrentSongDuration = () => {
    this.setState({
      currentSongDuration: this.state.songs[0].song.song.duration_ms,
    });
  }

  tickSongTimer = async () => {
    setTimeout(() => { this.tickSongTimer() }, 1000);
    this.setState({
      currentSongPosition: currentSongPosition + 1000
    })
  }

  handleFinish = async () => {
    const timeCheck = 5000;
    setTimeout(() => { this.handleFinish() }, timeCheck);
    let data = await Spotify.getCurrentlyPlaying();
    this.setState({currentSongPosition:data.progress});
    let timeRemain = data.duration - data.progress;
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
    const firstInQueueURI = this.state.songs[0].song.song.uri;
    Spotify.playSong(firstInQueueURI);
    this.updateCurrentSongDuration();
  }

  render() {
    const { songs, spotifyData } = this.state;
    return (
      <div>
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
          <React.Fragment>
            <PlayerWrapper playing={this.state.playing} start={this.handlePlay}
              skip={this.handleNext} uri={songs[0].song.song.uri} currentSongDuration={this.state.currentSongDuration}
              currentSongPosition={this.state.currentSongPosition}>
              <Songcard
                currentSong="true"
                songObj={songs[0]}
                onDelete={this.handleNext}
                priority={songs[0].priority}
              />
            </PlayerWrapper>
            <h2>Queue</h2>
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
                ))}
          </React.Fragment>
        }
      </div>
    );
  }
}

export default Songcards;
