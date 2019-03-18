import React, { Component } from "react";
import Joi from "joi";
import _ from "lodash";
import Spotify from "../services/spotifyService";
import InputCustom from "./common/InputCustom";
import Submit from "./common/Submit";
import SearchTable from "./SearchTable";

class SearchBar extends Component {
  state = {
    search: {
      query: ""
    },
    errors: {},
    result: {}
  };

  schema = {
    query: Joi.string().allow('')
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
    
    const errors = this.validate();
    this.setState({ 
      errors: errors || {} });
    if (errors) {this.state.result=null
      return;
    }

    const { search } = this.state;
    if((search.query.length)>3){  
      const data = await Spotify.search(search.query);
      this.setState({ result: data });
    }else{
      this.setState({result:null});
    }
  };

  handleChange = e => {
    e.preventDefault();
    const search = { ...this.state.search };
    const component = e.currentTarget.name;
    search[component] = e.currentTarget.value;
    this.setState({ search });

  };

  renderSearchBar = () => {
    const { search, errors } = this.state;
    return (
      <form form autoComplete="off" onKeyUp={this.handleSubmit} onSubmit={this.handleSubmit} className="custom-search-form">
        <InputCustom
          name="query"
          type="text"
          classProp="custom-search"
          value={search.query}
          placeholder="Search"
          error={errors.query}
          onChange={this.handleChange}
        />
      </form>
    );
  }


  render() {
    const { result } = this.state;

    return (
      <div>
        {this.renderSearchBar()}
        {_.isEmpty(result) ? null : <SearchTable result={this.state.result} />}
      </div>
    );
  }
}

export default SearchBar;
