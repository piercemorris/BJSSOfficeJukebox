import React, { Component } from "react";

class SearchTable extends Component {
  state = { 
    headers: ["#", "Song name", "Album", "Artist", ""]
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
            <tr className={item.explicit ? "search-table-row table-warning" : "search-table-row"}>
              <td><img src={item.album.images[2].url} /></td>
              <td>{item.name}</td>
              <td>{item.album.name}</td>
              <td>{item.artists[0].name}</td>
              <td><button className="btn btn-primary">Add</button></td>
            </tr>
          ))}
        </tbody>
      </table>
     );
  }
}
 
export default SearchTable;
