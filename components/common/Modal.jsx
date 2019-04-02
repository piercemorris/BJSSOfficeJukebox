import React from 'react';

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