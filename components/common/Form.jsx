import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from "./Input";
import Submit from "./Submit";

/**
 * @api {Class Component} Form common/Form.jsx
 * @apiName Form
 * @apiGroup Components
 * @apiDescription  This component is used for forms. It is built to be used as an extension to provide
 *                  common functionality accross all forms i.e. login, signup etc. usability is documented
 *                  in the code
 * @apiSuccessExample LoginForm.jsx
 *    Class LoginForm extends Form {
 *      schema = { ... }
 *      doSubmit() { ... }
 *      render() {
 *        return (
 *          {this.renderTitle("Login form")}
 *          ...
 *        );
 *      }
 *    }
 */
class Form extends Component {
  state = {
    data: {},
    errors: {}
  }

  validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details)
      errors[item.path[0]] = item.message;
    return errors;
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderInput(name, label, placeholder, type = 'text') {
    const { data, errors } = this.state;
    return (
      <div className="form-input">
        <Input
          name={name}
          value={data[name]}
          type={type}
          label={label}
          onChange={this.handleChange}
          error={errors[name]}
          placeholder={placeholder}
        />
      </div>
    );
  }

  renderTitle(title) {
    return (
      <div className="offset-title">
        <h2>{title}</h2>
      </div>
    );
  }

  renderButton(text) {
    return <Submit text={text} />
  }
}

export default Form;