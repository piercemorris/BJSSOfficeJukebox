import React from "react";

const InputCustom = ({ name, type, label, placeholder, value, error, onChange, classProp }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        className={
          error
            ? "alert-danger " + classProp
            : classProp
        }
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default InputCustom;
