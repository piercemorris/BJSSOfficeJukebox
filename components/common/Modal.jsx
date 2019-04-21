import React from 'react';

/**
 * @api {Stateless functional Component} <Modal|show|children/> common/Modal.jsx
 * @apiName Modal
 * @apiGroup Components
 * @apiParam {Boolean} show A boolean value to indicate whether the modal is displayed or hidden
 * @apiParam {Object[]} children A built in React object which specficies all the children of the component
 * @apiDescription  A modal that appears higher than another other component on screen, used to show
 *                  important information or feedback to the user
 * @apiSuccessExample Songcards.jsx
 *    <Modal show={false}>
 *      <h1>Song has been added!</h1>
 *    </Modal>
 */
const Modal = ({ show, children }) => {
  const showHideClassName = show ? "show-then-hide" : "hide";

  return (
    <div className={showHideClassName}>
      <div>
        {children}
      </div>
    </div>
  );
}

export default Modal;