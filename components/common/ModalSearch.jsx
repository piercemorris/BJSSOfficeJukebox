import React from 'react';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ?;

  return (
    <div className={showHideClassName}>
      <div className="modal-main-custom">
        {children}
        <button className="modal-button btn btn-primary" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;