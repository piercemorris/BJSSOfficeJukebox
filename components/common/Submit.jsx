import React from "react";

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