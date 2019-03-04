import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import songs from "../services/songService";
import user from "../services/userService";

class SearchTable extends Component {
  state = {
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
    const { userActive } = this.state;

    return (
      <React.Fragment>
        {userActive ?
          ""
          :
          <div class="alert alert-warning" role="alert">
            You have to be logged in to add a song!
          </div>
        }
        <table className="center text-center search-table">
          <thead>
            <tr>
              <th className="search-responsive" scope="col">#</th>
              <th scope="col">Track</th>
              <th className="search-responsive" scope="col">Album</th>
              <th className="search-responsive" scope="col">Artist</th>
              <th scope="col">Explicit</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {result.map(item => (
              <tr className="search-table-row">
                <td className="search-responsive">
                  <img src={item.album.images[2].url} />
                </td>
                <td>{item.name}</td>
                <td className="search-responsive">{item.album.name}</td>
                <td className="search-responsive">{item.artists[0].name}</td>
                <td>{item.explicit ? <img id="explicit_tag" src="static/img/explicit.png" width="60px" /> : null}</td>
                <td>
                  <FontAwesomeIcon onClick={() => this.handleAdd(item)} icon="plus" />
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