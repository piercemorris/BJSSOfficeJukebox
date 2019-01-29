import React, { Component } from "react";
import axios from "axios";

class SearchTable extends Component {
  constructor(props) {
    super(props)

  this.state = {
    itemsToShow: 3,
    expanded: false,
  }
  this.showMore = this.showMore.bind(this);
}
  showMore() {
    this.state.itemsToShow === 3 ? (
      this.setState({ itemsToShow: this.props.result.length, expanded: true })
      ) : (
        this.setState({ itemsToShow: 3, expanded: false })
      )
    }
    
  async handleAdd(song) {
    const apiEndpoint = "http://localhost:3000/api/songs/";
    const response = await axios.post(apiEndpoint, { song });
  }

  render() {
    return(
      <table className="SearchTable center center-text ">
      <thead>
      </thead>
      <tbody>
        {this.props.result.slice(0, this.state.itemsToShow).map((song, i) =>
          <tr onClick={() => this.handleAdd(song) }>
          <td key={i}><img src={song.album.images[2].url} /></td>
          <td>{song.name}</td>
          <td>{song.artists[0].name}</td>
          </tr>
        )}
        <tr onClick={this.showMore}>
          <a onClick={this.showMore}>  
            {this.state.expanded ? (
              <span>Show less</span>
              ) : (
              <span>Show more</span>
              )
            }
            </a>
        </tr>
      </tbody>

    </table>
    );
  }
}

export default SearchTable;






