import React, { Component } from "react";
import axios from "axios";

class SearchTable extends Component {
  state = {
    headers: ["#", "Song name", "Album", "Artist", "Explicit", ""]
  };

  async handleAdd(song) {
    const apiEndpoint = "http://localhost:3000/api/songs/";
    const response = await axios.post(apiEndpoint, { song });
  }

  render() {
    const { result } = this.props;

    return (
      <table className="center text-center">
        <thead>
          <tr>
            {this.state.headers.map(header => (
              <th scope="col">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.result.map(item => (
            <tr
              className={"search-table-row"}
            >
              <td>
                <img src={item.album.images[2].url} />
              </td>
              <td>{item.name}</td>
              <td>{item.album.name}</td>
              <td>{item.artists[0].name}</td>
              <td>{item.explicit ?  <img id="explicit_tag" src="static/explicit.png" width="60px"/>: null}</td>
              <td>
                <button
                  onClick={() => this.handleAdd(item)}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default SearchTable;