import React from "react";

/**
 * @api {Stateless functional Component} <InputCustom|name|type|label|placeholder|value?|error|onChange|classProp/> common/InputCustom.jsx
 * @apiName InputCustom
 * @apiGroup Components
 * @apiParam {String} name Name of the input component, used for referencing the label with the associated input
 * @apiParam {String} type Type of the html input element
 * @apiParam {String} label Text for the label to display
 * @apiParam {String} placeholder Text to show as a placholder for the input element
 * @apiParam {String} value Default value for the input element
 * @apiParam {Boolean} error Boolean value based on the user input validation
 * @apiParam {Function} onChange Function to run when the input value changes
 * @apiParam {String} classProp Class properties to pass down to the component
 * @apiDescription  An text input component that is rendered. Customised to handle errors and on change properties,
 *                  contains a label and input element. This is a more malleable version of the Input component with
 *                  class properties.
 * @apiSuccessExample LoginForm.jsx
 *    <InputCustom
 *      name="username"
 *      type="text"
 *      label="Username"
 *      placeholder="johnsmith123"
 *      error={false}
 *      onChange={this.handleChange}
 *      classProp="red btn"
 *    />
 */
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
