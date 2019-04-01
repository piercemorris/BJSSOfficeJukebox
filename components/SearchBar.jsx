import React, { Component } from "react";
import Spotify from "../services/spotifyService";
import SearchTable from "./SearchTable";

class SearchBar extends Component {
  state = {
    search: {
      query: ""
    },
    authorised: true,
    clicked: false,
    showTable:true,
    result: {}
  };


  handleSubmit = async e => {
    e.preventDefault();

    const { search } = this.state;

    if (search.query.length > 3) {
      try {
        const data = await Spotify.search(search.query);
        this.state.search.query="";
        this.setState({ result: data, authorised: true, clicked: true });
      } catch (ex) {
        if (ex.response.status === 401)
          this.setState({ authorised: false, clicked: true });
      }
    } else {
      this.setState({ result: null, authorised: true, clicked: true });
    }
    this.setState({showTable: !this.state.showTable})
    console.log(this.state.showTable);
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
