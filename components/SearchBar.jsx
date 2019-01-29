import React, { Component } from "react";
import Joi from "joi";
import axios from "axios";
import _ from "lodash";
import queryString from "query-string";
import Input from "./common/Input";
import Submit from "./common/Submit";
import SearchTable from "./SearchTable";

class SearchBar extends Component {
  state = {
    accessToken: "",
    search: {
      query: ""
    },
    errors: {},
    result: {}
  };

  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    this.setState({ accessToken: parsed.access_token });
  }

  schema = {
    query: Joi.string()
      .required()
      .label("Query")
  };

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
    console.log("aaa\n");
    event.preventDefault();
    const errors = this.validate();
    this.setState({
       errors: errors || {} 
    });
    if (errors) {
      this.state.result=null
      return;
    }
    const { search, accessToken } = this.state;
    let apiEndpoint =
      "https://api.spotify.com/v1/search?q=" + search.query + "&type=track";

    const response = await axios.get(apiEndpoint, {
      headers: { Authorization: "Bearer " + accessToken }
    });

    console.log(response.data);
    this.setState({ result: response.data });
  };

  handleChange = e => {
    const search = { ...this.state.search };
    const component = e.currentTarget.name;
    search[component] = e.currentTarget.value;
    this.setState({ search });
    this.handleSubmit();
  };
  
  render() {
    const { search, errors, result } = this.state;

    if (_.isEmpty(result)) {
      return (
        <div>
          <form autoComplete="off" onKeyUp={this.handleSubmit}>
            <Input
              autoComplete="off"              
              name="query"
              type="text"
              value={search.query}
              error={errors.query}
              onChange={this.handleChange}
            />
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <form form autoComplete="off" onKeyUp={this.handleSubmit}>
            <Input
              autoComplete="off"
              name="query"
              type="text"
              value={search.query}
              error={errors.query}
              onChange={this.handleChange}/>
          </form>
          <SearchTable result={this.state.result.tracks.items}/>
            
        </div>
      );
    }
  }
}

export default SearchBar;
