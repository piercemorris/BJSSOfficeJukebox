import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SongDuration from "./SongDuration";
import VolumeSlider from "./VolumeSlider";

/**
 * @api {Class Component} <PlaybackControls|playing|paused|currentSongDuration|handleNext|handlePlay/> queue/PlaybackControls.jsx
 * @apiName PlaybackControls
 * @apiGroup Components
 * @apiParam {Boolean} playing Boolean value if the app is playing
 * @apiParam {Boolean} paused Boolean value if the app is paused
 * @apiParam {Integer} currentSongDuration Time in milliseconds of the current track's duration
 * @apiParam {Function} handleNext Function to call if the current song is skipped
 * @apiParam {Function} handlePlay Function to call if the current song is played/paused
 * @apiDescription  This component is responsible for rendering and handling the playback controls.
 * @apiSuccessExample CurrentlyPlaying.jsx
 *    <PlaybackControls
 *      playing={this.playing}
 *      paused={!this.playing}
 *      currentSongDuration={this.songs[0].duration}
 *      handleNext={this.handleNext}
 *      handleNext={this.handlePlay}
 *    />
 */
class PlaybackControls extends Component {
  render() {

    const { playing, paused, currentSongDuration, handlePlay, handleNext } = this.props;

    return (
      <div className="playback-controls">
        <div className="row">
          <div>
            {currentSongDuration ? // if there's a song duration there's a song
              <>
                {!playing ? // checks if the song is not playing then renders play button or pause if it is playing
                  <div className="playback-controls__play">
                    <FontAwesomeIcon onClick={() => handlePlay()} className="playback-controls__button" icon={['far', 'play-circle']} size="3x" inverse={true} />
                  </div>
                  :
                  <div className="playback-controls__play">
                    <FontAwesomeIcon onClick={() => handlePlay()} className="playback-controls__button" icon={['far', 'pause-circle']} size="3x" inverse={true} />
                  </div>
                }
                <div className="playback-controls__duration">
                  <SongDuration currentSongDuration={currentSongDuration} isPlaying={playing} isPaused={paused} handleNext={handleNext} />
                </div>
                <div className="playback-controls__skip">
                  <FontAwesomeIcon onClick={() => handleNext()} className="playback-controls__button" icon={['far', 'arrow-alt-circle-right']} size="3x" inverse={true} />
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
    );
  }
}

export default PlaybackControls;