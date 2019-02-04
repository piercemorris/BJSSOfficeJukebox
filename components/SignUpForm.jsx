import React, { Component } from 'react';
import Joi from "joi-browser";
import Form from "./common/Form";
import { register } from "../services/userService";

class SignUpForm extends Form {

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await register(data);
      localStorage.setItem("token", jwt);
      window.location = '/';
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username - ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="form">
        {this.renderTitle("Sign up", "Sign up for a new Jukebox account")}
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="col-md-8">
              {this.renderInput("username", "Username", "Username")}
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-8">
              {this.renderInput("password", "Password", "Password", "password")}
            </div>
          </div>
          {this.renderButton()}
        </form>
      </div>
    );
  }
}

export default SignUpForm;