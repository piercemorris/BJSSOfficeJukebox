import React, { Component } from "react";
import Spotify from "../../services/spotifyService";
import SearchTable from "./SearchTable";

/**
 * @api {Class Component} <SearchBar|classProp/> search/SearchBar.jsx
 * @apiName SearchBar
 * @apiGroup Components
 * @apiParam {String} classProp Classes to pass down to the search bar component
 * @apiDescription  This components renders the search bar and invisible search table
 * @apiSuccessExample Navbar.jsx
 *    <SearchBar/>
 */
class SearchBar extends Component {
  state = {
    search: {
      query: ""
    },
    authorised: true,
    clicked: false,
    showTable: true,
    result: {}
  };

  // handle search submit and checks for error codes from server
  handleSubmit = async e => {
    e.preventDefault();

    const { search } = this.state;

    if (search.query.length > 3) {
      try {
        const data = await Spotify.search(search.query);
        this.state.search.query = "";
        this.setState({ result: data, authorised: true, clicked: true });
      } catch (ex) {
        if (ex.response.status === 401)
          this.setState({ authorised: false, clicked: true });
      }
    } else {
      this.setState({ result: null, authorised: true, clicked: true });
    }
    this.setState({ showTable: !this.state.showTable })
    console.log(this.state.showTable);
  };

  // when key presses, updates search text with current input value
  handleChange = e => {
    const search = { ...this.state.search };
    const component = e.currentTarget.name;
    search[component] = e.currentTarget.value;
    this.setState({ search });

  };

  // function for rendering the search bar component
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

  // renders the search bar and search table if search has commenced
  render() {
    const { result, clicked } = this.state;

    return (
      <>
        <form>
          {this.renderSearchBar()}
        </form>
        {!clicked ? null : <SearchTable result={this.state.result} authorised={this.state.authorised} showTable={this.state.showTable} />}
      </>
    );
  }
}

export default SearchBar;
