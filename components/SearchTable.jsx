import React, { Component } from "react";
import songs from "../services/songService";
import user from "../services/userService";

class SearchTable extends Component {
  state = {
    headers: ["#", "Song name", "Album", "Artist", "Explicit", ""],
    userActive: false
  };

  async handleAdd(song) {
    const currentUser = await user.getCurrentUser();
    const response = songs.addSong({ song }, currentUser._id, currentUser.username);
  }

  async componentWillMount() {
    const response = await user.getCurrentUser();
    if (response) {
      this.setState({ userActive: true });
    }
  }

  render() {
    const { result } = this.props;
    const { headers, userActive } = this.state;

    return (
      <React.Fragment>
        {userActive ?
          ""
          :
          <div class="alert alert-warning" role="alert">
            You have to be logged in to add a song!
          </div>
        }
        <table className="center text-center">
          <thead>
            <tr>
              {headers.map(header => (
                <th scope="col">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.map(item => (
              <tr className="search-table-row">
                <td>
                  <img src={item.album.images[2].url} />
                </td>
                <td>{item.name}</td>
                <td>{item.album.name}</td>
                <td>{item.artists[0].name}</td>
                <td>{item.explicit ? <img id="explicit_tag" src="static/img/explicit.png" width="60px" /> : null}</td>
                <td>
                  <button
                    onClick={() => this.handleAdd(item)}
                    className={userActive ? "btn btn-primary" : "btn btn-primary disabled"}
                  >
                    Add
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default SearchTable;