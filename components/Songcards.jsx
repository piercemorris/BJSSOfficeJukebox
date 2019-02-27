import React, { Component } from "react";
import _ from "lodash";
import Songcard from "./Songcard";
import Info from "../components/common/Info";
import PlayerWrapper from "../components/PlayerWrapper";
import Placeholder from "../components/Placeholder";
import Spotify from "../services/spotifyService";
import song from "../services/songService";

class Songcards extends Component {
  state = {
    songs: null,
    start: false,
    playing: false
  };

  async componentDidMount() {
    const response = await song.getSongs();
    this.setState({ songs: response.data });
  }

  handleFinish = async () => {
    const timeCheck = 5000;
    setTimeout(() => { this.handleFinish() }, timeCheck);
    let data = await Spotify.getCurrentlyPlaying();
    let timeRemain = data.duration - data.progress;
    console.log(timeRemain);
    if(timeRemain < timeCheck) {
      setTimeout(() => {
        this.handleNext();
      }, timeRemain);
    }
  }

  handlePlay = () => {
    if(!this.state.start) {
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
    this.setState({ songs });
    song.deleteSong(id);
  }

  handleNext = () => {
    this.handleDelete(this.state.songs[0]._id);
    const firstInQueueURI = this.state.songs[0].song.song.uri;
    Spotify.playSong(firstInQueueURI);
  }

  render() {
    const { songs } = this.state;
    return (
      <div>
        <Info text="A song in the queue will only play if you have Spotify opened on your account!" />
        {!song.areSongs(songs)
          ?
          <React.Fragment>
            <h1>Queue</h1>
            <Placeholder />
          </React.Fragment>
          :
          <React.Fragment>
            <PlayerWrapper playing={this.state.playing} start={this.handlePlay}
              skip={this.handleNext} uri={songs[0].song.song.uri}>
              <Songcard
                currentSong="true"
                songObj={songs[0]}
                onDelete={this.handleNext}
                priority={Math.floor(Math.random() * (5 - 1 + 1) + 1)}
              />
            </PlayerWrapper>
            <h1>Queue</h1>
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
                    priority={Math.floor(Math.random() * (5 - 1 + 1) + 1)}
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
