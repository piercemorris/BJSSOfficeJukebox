import React, { Component } from "react";
import Joi from "joi";
import _ from "lodash";
import Spotify from "../services/spotifyService";
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

  schema = {
    query: Joi.string()
      .required()
      .label("Query")
  };

  componentDidMount() {
    const token = Spotify.getSpotifyAccessToken();
    this.setState({ accessToken: token });
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
    //console.log(search, accessToken);
    const response = await Spotify.searchSpotifyQuery(search.query, accessToken);
    this.setState({ result: response });
  };

  handleChange = e => {
    const search = { ...this.state.search };
    const component = e.currentTarget.name;
    search[component] = e.currentTarget.value;
    this.setState({ search });
  };

  render() {
    const { search, errors, result } = this.state;

    if (_.isEmpty(result)) {
      return (
        <div>
          {this.state.accessToken}
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
    } else {
      return (
        <div>
          {this.state.accessToken}
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
          <SearchTable result={this.state.result.tracks.items} />
        </div>
      );
    }
  }
}

export default SearchBar;
