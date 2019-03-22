import React, { Component } from "react";
import _ from "lodash";
import Spotify from "../services/spotifyService";
import SearchTable from "./SearchTable";

class SearchBar extends Component {
  state = {
    search: {
      query: ""
    },
    result: {}
  };


  handleSubmit = async e => {
    e.preventDefault();

    const { search } = this.state;
    if ((search.query.length) > 3) {
      const data = await Spotify.search(search.query);
      this.setState({ result: data });
    } else {
      this.setState({ result: null });
    }
  };

  handleChange = e => {
    const search = { ...this.state.search };
    const component = e.currentTarget.name;
    search[component] = e.currentTarget.value;
    this.setState({ search });
  };

  renderSearchBar = () => {
    const { search } = this.state;
    return (
      <>
        <input
          className={this.props.classProp}
          value={search.query}
          name="query"
          type="text"
          placeholder="Search"
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit} className="navbar-search__button">Search</button>
      </>
    );
  }


  render() {
    const { result } = this.state;

    return (
      <>
        {this.renderSearchBar()}
        {_.isEmpty(result) ? null : <SearchTable result={this.state.result} />}
      </>
    );
  }
}

export default SearchBar;
