import React from "react";

/**
 * @api {Stateless functional Component} <Input|name|type|label|placeholder|value?|error|onChange/> common/Input.jsx
 * @apiName Input
 * @apiGroup Components
 * @apiParam {String} name Name of the input component, used for referencing the label with the associated input
 * @apiParam {String} type Type of the html input element
 * @apiParam {String} label Text for the label to display
 * @apiParam {String} placeholder Text to show as a placholder for the input element
 * @apiParam {String} value Default value for the input element
 * @apiParam {Boolean} error Boolean value based on the user input validation
 * @apiParam {Function} onChange Function to run when the input value changes
 * @apiDescription  An text input component that is rendered. Customised to handle errors and on change properties,
 *                  contains a label and input element.
 * @apiSuccessExample LoginForm.jsx
 *    <Input
 *      name="username"
 *      type="text"
 *      label="Username"
 *      placeholder="johnsmith123"
 *      error={false}
 *      onChange={this.handleChange}
 *    />
 */
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
