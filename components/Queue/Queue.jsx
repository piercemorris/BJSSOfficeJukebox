import React from 'react'
import Button from "../common/Button";
import song from "../../services/songService";

const Queue = (props) => {

  const { tracks, onDelete } = props;

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
          {!song.areSongsInQueue(tracks) ?
            null
            :
            tracks
              .filter(song => tracks.indexOf(song) != 0)
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
                    <Button onDelete={onDelete} song={song} text="Remove" className="bottom" />
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </section>
  );
}

export default Queue;
