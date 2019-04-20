import React from 'react';
import Joi from "joi-browser";
import Form from "../common/Form";
import user from "../../services/userService";

/**
 * @api {Class Component} <SignUpForm/> forms/SignUpForm.jsx
 * @apiName SignUpForm
 * @apiGroup Components
 * @apiDescription  This component simple renders a sign up form. Extends from class Form.
 * @apiSuccessExample Signup.js
 *    <SignUpForm />
 */
class SignUpForm extends Form {

  // schema used to validate user input
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

  // handles what to perform when the user submits the login form
  doSubmit = async () => {
    try {
      // checks if user or device account and confirms password
      const isDevice = document.getElementById("device").checked;
      const { data } = this.state;
      if (data.password != data.confirmpassword)
        throw new Error("\"password\" inputs do not match");

      const response = await user.register({ username: data.username, password: data.password, isDevice });
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
        <div className="form-box">
          <div className="row">
            <img className="form-logo" src="../static/img/jukebox-logo-white.png" alt="" />
            {this.renderTitle("Sign up", "Sign up for a new Jukebox account")}
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username", "Username")}
              {this.renderInput("password", "Password", "Password", "password")}
              {this.renderInput("confirmpassword", "Confirm Password", "Password", "password")}
              <div className="form__input">
                <label className="form__input-label" htmlFor="device">Is this a device account?</label>
                <input className="form__input-input" type="checkbox" id="device" name="device" />
              </div>
              {this.renderButton("Sign up for office jukebox")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;