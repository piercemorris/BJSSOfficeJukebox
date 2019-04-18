import React from 'react';

/**
 * @api {Stateless functional Component} <Button|text|onDelete|song/> common/Button.jsx
 * @apiName Button
 * @apiGroup Components
 * @apiParam {String} text Text to display on the button
 * @apiParam {Function} onDelete Delete functionality that the button will perform on click
 * @apiParam {Object} song The song to delete
 * @apiDescription  This components renders a button to delete an object. Note this should be refactored to handle
 *                  more general items
 * @apiSuccessExample Songcards.jsx
 *    <Button text="Remove" onDelete={this.onDelete} song={this.song}/>
 */
const Button = ({ text, onDelete, song }) => {
  return (
    <button onClick={() => onDelete(song._id)} className="btn btn-remove">
      {text}
    </button>
  );
}

export default Button;