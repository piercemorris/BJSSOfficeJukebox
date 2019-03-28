import React from 'react';
import Button from "../common/Button";
import PlaybackControls from "../queue/PlaybackControls";
import ShowMore from "../../services/utilityService";

const CurrentlyPlaying = (props) => {

  const { track, onNext, onDelete, onPlay, currentSongDuration, playing, isDevice, isDeviceActive } = props;

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
            <div className="margin-top-sm">
              <Button onDelete={playing ? onNext : onDelete} song={track} text="Remove" />
            </div>
          </div>
        </div>
      </div>
      {isDevice ? // is the account a device or a user?
        <>
          {isDeviceActive ? // is the device active on Spotify?
            <PlaybackControls playing={playing} currentSongDuration={currentSongDuration} handlePlay={onPlay} />
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