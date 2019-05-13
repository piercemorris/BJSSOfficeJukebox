import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from "../common/Button";
import song from "../../services/songService";

/**
 * @api {Stateless Functional Component} <Queue|tracks|onDelete/> queue/Queue.jsx
 * @apiName Queue
 * @apiGroup Components
 * @apiParam {Object[]} tracks Object array of the songs in the queue
 * @apiParam {Function} onDelete Delete function if a song in the queue is to be deleted
 * @apiParam {Boolean} explicitToggle Boolean value if the explicit songs should be displayed or not
 * @apiParam {Boolean} deleteToggle Boolean value if the remove button should be displayed or not
 * @apiDescription  This component is responsible for rendering the queue of songs and a delete function to remove
 *                  any of the songs.
 * @apiSuccessExample CurrentlyPlaying.jsx
 *    <Queue
 *      tracks={this.songs}
 *      onDelete={this.handleDelete}
 *    />
 */
const Queue = ({ tracks, onDelete, explicitToggle, deleteToggle }) => {
  return (
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
          {!song.areSongsInQueue(tracks) ? // if there isn't more than one song then return nothing
            null
            :
            tracks
              .filter(song => tracks.indexOf(song) != 0)
              .filter(song => (explicitToggle != true || song.song.song.explicit != true))
              .map((song, index) => (
                <tr key={song._id} className="queue__table__content">
                  <td className="queue__table-image">
                  {console.log(index)}
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
                  <td>
                    { index === 0 || index === 1 || index === 2 ? 
                      <FontAwesomeIcon icon='lock' />
                      : 
                      parseFloat(Math.round(song.priority * 100) / 100).toFixed(2)}
                  </td>
                  {deleteToggle ?
                  null
                  :
                  <td>
                    <Button onDelete={onDelete} song={song} text="Remove" className="bottom" />
                  </td>
                  }
                </tr>
              ))
          }
        </tbody>
      </table>
    </section>
  );
}

export default Queue;
