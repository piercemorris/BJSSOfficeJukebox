import React from 'react';
import axios from 'axios';
import Joi from "joi-browser";
import Form from "./common/Form";

class LoginForm extends Form {

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    console.log(this.state.data); // obj (username, password);
    const { data } = this.state;

    await axios.post('http://localhost:3000/api/users/login')
      .send(data)
      .then("Successful post")
      .catch(err => console.log(err));
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

export default LoginForm;