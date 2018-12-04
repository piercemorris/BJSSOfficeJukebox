import React, { Component } from 'react'
import Joi from 'joi';
import axios from "axios";
import queryString from "query-string";
import Input from "./common/Input";
import Submit from "./common/Submit";

class SearchBar extends Component {
  state = { 
    accessToken: "",
    search: {
      query: ""
    },
    errors: {

    }
   }

   componentDidMount() {
     const parsed = queryString.parse(window.location.search);
     this.setState({accessToken: parsed.access_token});
   }

   schema = {
    query: Joi.string()
      .required()
      .label("Query")
   }

   validate = () => {
    const options = {
      abortEarly: false
    };
    const { error } = Joi.validate(this.state.search, this.schema, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = async e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    const { search, accessToken } = this.state;
    let apiEndpoint = "https://api.spotify.com/v1/search?q=" + search.query + "&type=track";

    const response = await axios.get(apiEndpoint, {
      headers: { 'Authorization': 'Bearer ' + accessToken }});

    console.log(response);
   }

  handleChange = e => {
    const search = { ...this.state.search };
    const component = e.currentTarget.name;
    search[component] = e.currentTarget.value;
    this.setState({ search });
  };

  render() {
    
    const { search, errors } = this.state;
    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="query"
            type="text"
            value={search.query}
            label="Search for a song"
            error={errors.query}
            onChange={this.handleChange}
          />
          <Submit />
        </form>
      </div>
     );
  }
}
 
export default SearchBar;