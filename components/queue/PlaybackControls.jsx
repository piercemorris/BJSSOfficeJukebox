import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SongDuration from "./SongDuration";
import VolumeSlider from "./VolumeSlider";

class PlaybackControls extends Component {
  render() {

    const { playing, paused, currentSongDuration, handlePlay, handleNext } = this.props;

    return (
      <div className="playback-controls">
        <div className="row">
          <div>
            {currentSongDuration ?
              <>
                {!playing ?
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