import React, { Component } from "react";
import _ from "lodash";
import Songcard from "./Songcard";
import PlayerWrapper from "../components/PlayerWrapper";
import Placeholder from "../components/Placeholder";
import song from "../services/songService";
import Spotify from "../services/spotifyService";

class Songcards extends Component {
  state = {
    songs: null,
    playing: false
  };

  async componentDidMount() {
    const token = Spotify.getSpotifyAccessToken();
    this.setState({ accessToken: token });
    Spotify.setToken(token);

    const response = await song.getSongs();
    this.setState({ songs: response.data });

    const firstInQueueURI = this.state.songs[0].song.song.uri;
    Spotify.startMusic(firstInQueueURI);
    this.setState({ playing: true });
    this.handleSongFinish();
  }

  playNextSong = () => {
    this.handleDelete(this.state.songs[0]._id);
    Spotify.startMusic(this.state.songs[0].song.song.uri);
  }

  handleSongFinish = () => {
    const timeCheck = 5000;
    setTimeout(() => { this.handleSongFinish() }, timeCheck);

    Spotify.Client.getMyCurrentPlayingTrack({}, (err, data) => {
      let timeRemain = data.item.duration_ms - data.progress_ms;
      //console.log(timeRemain);
      if (timeRemain < timeCheck)
        setTimeout(() => {
          this.playNextSong();
        }, timeRemain);
    });
  }

  handlePause = () => {
    Spotify.playPauseMusic();
    this.setState({ playing: !this.state.playing });
  }

  handleDelete = (id) => {
    const songs = _.filter(this.state.songs, song => { return song._id !== id });
    this.state = { songs };
    this.setState({ songs });
    song.deleteSong(id);
  }

  render() {
    const { songs } = this.state;
    return (
      <div>
        {!song.areSongs(songs)
          ?
          <React.Fragment>
            <h1>Queue</h1>
            <Placeholder />
          </React.Fragment>
          :
          <React.Fragment>
            <PlayerWrapper playing={this.state.playing} start={this.handlePause}
              skip={this.playNextSong} uri={songs[0].song.song.uri}>
              <Songcard
                currentSong="true"
                songObj={songs[0]}
                onDelete={this.playNextSong}
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
