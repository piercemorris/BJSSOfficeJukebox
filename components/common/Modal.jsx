import React from 'react';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal-custom display-block" : "modal-custom display-none";

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