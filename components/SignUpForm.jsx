import React, { Component } from 'react';
import Joi from "joi-browser";
import Form from "./common/Form";
import Input from './common/Input';
import Submit from "./common/Submit";

class SignUpForm extends Form {

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
    confirmpassword: Joi
      .string()
      .required()
      .options({
        language: {
          any: {
            allowOnly: '!!Passwords do not match',
          }
        }
      })
  };

  doSubmit = () => {
    console.log(this.state.data);

  };

  render() {
    return (
      <div className="form">
        <div className="offset-title">
          <h1>Sign up</h1>
          <span>Sign up for a new Jukebox account</span>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="col-md-8">
              {this.renderInput("username", "Username", "Username")}
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-4">
              {this.renderInput("password", "Password", "", "password")}
            </div>
            <div className="col-md-4">
              {this.renderInput("confirmpassword", "Confirm Password", "", "password")}
            </div>
          </div>
          {this.renderButton()}
        </form>
      </div>
    );
  }
}

export default SignUpForm;