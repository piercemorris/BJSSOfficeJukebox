import React from "react";

/**
 * @api {Stateless functional Component} <Submit|text/> common/Submit.jsx
 * @apiName Submit
 * @apiGroup Components
 * @apiParam {String} text Text to display on the submit button
 * @apiDescription  This renders a button to handle form submits. Therefore it must be wrapped within a form tag
 * @apiSuccessExample LoginForm.jsx
 *    <form>
 *      ...
 *      <Submit text="Submit form" />
 *    </form>
 */
const Submit = ({ text }) => {
  return (
    <div className="d-flex justify-content-center">
      <button type="submit" className="btn form__input-button">
        {text}
      </button>
    </div>
  );
};

export default Submit;