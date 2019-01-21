import React, { Component } from 'react';
import axios from "axios";
import Joi from "joi-browser";
import Input from './common/Input';
import Submit from "./common/Submit";

class SignUpForm extends Component {
  state = {
    signupform: {
      username: "",
      password: "",
      confirmpassword: ""
    },
    errors: {}
  }

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
    confirmpassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .label("Confirm password")
  };

  validate = () => {
    const options = {
      abortEarly: false
    };
    const { error } = Joi.validate(this.state.signupform, this.schema, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleChange = e => {
    const signupform = { ...this.state.signupform };
    const component = e.currentTarget.name;
    signupform[component] = e.currentTarget.value;
    this.setState({ signupform });
  }

  render() {
    const { errors, signupform } = this.state;
    return (
      <div className="form">
        <div className="offset-title">
          <h1>Sign up</h1>
          <span>Sign up for a new Jukebox account</span>
        </div>
        <form>
          <div className="form-row">
            <div className="col-md-8">
              <Input
                name="username"
                type="text"
                label="Username"
                value={signupform.username}
                error={errors.username}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-4">
              <Input
                name="password"
                type="password"
                label="Password"
                value={signupform.password}
                error={errors.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-md-4">
              <Input
                name="confirmpassword"
                type="password"
                label="Confirm password"
                value={signupform.confirmpassword}
                error={errors.confirmpassword}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <Submit />
        </form>
      </div>
    );
  }
}

export default SignUpForm;