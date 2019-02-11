import React from "react";

const Input = ({ name, type, label, placeholder, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className={
          error
            ? "form-control form-control-lg alert-danger"
            : "form-control form-control-lg"
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

export default Input;
