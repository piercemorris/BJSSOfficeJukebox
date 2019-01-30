import React from 'react';
import Joi from "joi-browser";
import Form from "./common/Form";

class SignUpForm extends Form {

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    console.log(this.state.data);
  };

  render() {
    return (
      <div className="form">
        {this.renderTitle("Log in", "Log in to your Jukebox account")}
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