import React from "react";

const Input = ({ name, type, label, placeholder, value, error, onChange }) => {
  return (
    <div className="form__input">
      <label className="form__input-label" htmlFor={name}>{label}</label>
      <input
        className={
          error
            ? "form__input-input input__error-input"
            : "form__input-input"
        }
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {error && <p className="input__error-message">{error}</p>}
    </div>
  );
};

export default Input;
