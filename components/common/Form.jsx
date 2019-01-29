import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from "../common/Input";
import Submit from "../common/Submit";

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
      <div className="form-row">
        <div className="col-md-8">
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
      </div>
    );
  }

  renderButton() {
    return <Submit />
  }
}

export default Form;