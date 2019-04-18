import React from 'react'

/**
 * @api {Stateless functional Component} <Info|text/> common/Info.jsx
 * @apiName Info
 * @apiGroup Components
 * @apiParam {String} text Text to display
 * @apiDescription  Simply enders information to the user
 * @apiSuccessExample Songcards.jsx
 *    <Info text="Be careful"/>
 */
const Info = ({ text }) => {
  return (
    <div className="alert alert-info">
      {text}
    </div>
  );
}

export default Info;