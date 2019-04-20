import React from 'react';
import PlaybackControls from "./PlaybackControls";
import ShowMore from "../../services/utilityService";

/**
 * @api {Stateless Functional Component} <CurrentlyPlaying|track|currentSongDuration|playing|isDevice|isDeviceActive|onNext|onPlay/> queue/CurrentlyPlaying.jsx
 * @apiName CurrentlyPlaying
 * @apiGroup Components
 * @apiParam {Object} track The object of the track currently in the first position in the queue
 * @apiParam {Integer} currentSongDuration Time in milliseconds of the current track's duration
 * @apiParam {Boolean} playing Boolean value if the app is playing
 * @apiParam {Boolean} isDevice Boolean value if the account is a device account or not
 * @apiParam {Boolean} isDeviceActive Boolean value if there's a Spotify account active on a device
 * @apiParam {Function} onNext Function to call if the current song is skipped
 * @apiParam {Function} onPlay Function to call if the current song is played/paused
 * @apiDescription  This component handles the first song in the queue and contains all the playback controls. It is responsible for 
 *                  checking user authorisation and checks if the account is allowed to control playback of the music.
 * @apiSuccessExample Songcards.jsx
 *    <CurrentlyPlaying
 *      track={this.songs[0]}
 *      currentSongDuration={this.songs[0].duration}
 *      playing={this.playing}
 *      isDevice={true}
 *      isDeviceActive={false}
 *      onNext={this.handleNext}
 *      onPlay={this.handlePlay}
 *    />
 */
const CurrentlyPlaying = (props) => {

  const { track, onNext, onPlay, currentSongDuration, playing, isDevice, isDeviceActive } = props;

  return (
    <section className="currently-playing">
      <div className="currently-playing__song-info">
        <div className="row">
          <div className="col-1-of-3">
            <div className="currenty-playing__image">
              <img
                className="currently-playing__image-img"
                src={track.song.song.album.images[1].url}
              />
            </div>
          </div>
          <div className="col-2-of-3">
            <h2 className="text-box">
              <span className="now-playing">Now Playing</span>
              <span className="text-box__song-name">
                <ShowMore>
                  {track.song.song.name}
                </ShowMore>
              </span>
              {track.song.song.explicit ?
                <div className="text-box__explicit">
                  <span className="text-box__explicit-text">explicit</span>
                </div> : null
              }
              <span className="text-box__song-artist">{track.song.song.artists[0].name}</span>
              <span className="text-box__song-album">{track.song.song.album.name}</span>
            </h2>
          </div>
        </div>
      </div>
      {isDevice ? // is the account a device or a user?
        <>
          {isDeviceActive ? // is the device active on Spotify?
            <PlaybackControls playing={playing} currentSongDuration={currentSongDuration} handlePlay={onPlay} handleNext={onNext} />
            :
            <div className="no-device">
              No active Spotify is open on the device account!
              <a href="https://open.spotify.com/browse/featured" target="_blank" className="btn btn-standard margin-text-sm">Open Spotify</a>
            </div>
          }
        </>
        :
        <>
          <div className="no-device">
            Playback features can changed on the device playing the music
          </div>
        </>
      }
    </section>
  );
}

export default CurrentlyPlaying;
