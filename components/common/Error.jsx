import React from 'react';

/**
 * @api {Stateless functional Component} <Error|text|subtext/> common/Error.jsx
 * @apiName Error
 * @apiGroup Components
 * @apiParam {String} text Text to display the error message
 * @apiParam {String} subtext Subtext to display more information on the error message 
 * @apiDescription  This components renders an error note. It also renders any children to elaborate on an error message
 * @apiSuccessExample Songcards.jsx
 *    <Error text="Unauthorised" subtext="You need to login to your account to search for songs">
 *      <img src="..." alt="..." />
 *    </Error>
 */
const Error = (props) => {
  return (
    <section className="authorise-page">
      <div className="authorise-page__text-box">
        <h1 className="authorise-page__heading">
          <span className="authorise-page__heading--main">{props.text}</span>
          <span className="authorise-page__heading--sub">{props.subtext}</span>
        </h1>
        {props.children}
      </div>
    </section>
  );
}

export default Error;