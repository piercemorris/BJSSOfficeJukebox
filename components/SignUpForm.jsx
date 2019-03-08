import React from 'react';
import Joi from "joi-browser";
import Form from "./common/Form";
import user from "../services/userService";

class SignUpForm extends Form {

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
    confirmpassword: Joi.string()
      .required()
      .label("Confirm Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      if (data.password != data.confirmpassword)
        throw new Error("\"password\" inputs do not match");

      const response = await user.register({ username: data.username, password: data.password });
      user.loginWithJwt(response.headers["x-auth-token"]);
      window.location = '/';
    }
    catch (ex) {
      const regex = /\busername|password\b/g;
      const errors = { ...this.state.errors };

      if (ex.response && ex.response.status === 400) {
        const error = ex.response.data;
        const type = error.match(regex);

        if (type[0] === "username") {
          errors.username = error;
        } else if (type[0] === "password") {
          errors.password = error;
        }
        this.setState({ errors });
      } else {
        const error = ex.message;
        const type = error.match(regex);
        if (type[0] === "password") {
          errors.password = error;
          errors.confirmpassword = error;
        }
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="form">
        {this.renderTitle("Sign up", "Sign up for a new Jukebox account")}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "Username")}
          {this.renderInput("password", "Password", "Password", "password")}
          {this.renderInput("confirmpassword", "Confirm Password", "Password", "password")}
          {this.renderButton()}
        </form>
      </div>
    );
  }
}

export default SignUpForm;