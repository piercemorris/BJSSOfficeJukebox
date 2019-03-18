import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import songs from "../services/songService";
import user from "../services/userService";
import Modal from "../components/common/Modal";

class SearchTable extends Component {
  state = {
    userActive: false,
    show: false,
    addedSong: ""
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  async handleAdd(song) {
    this.setState({ addedSong: song.name });
    const currentUser = await user.getCurrentUser();
    const response = await songs.addSong({ song }, currentUser._id, currentUser.username);
    this.showModal();
  }

  async componentWillMount() {
    const response = await user.getCurrentUser();
    if (response) {
      this.setState({ userActive: true });
    }
  }

  render() {
    const { result } = this.props;
    const { userActive, show, addedSong } = this.state;

    return (
      <React.Fragment>
        <Modal show={show} handleClose={this.hideModal}>
          {addedSong ?
            <div className="display-block">
              <span className="subtitle">Added</span>
              <span id="added-song">{addedSong}</span>
              <span className="subtitle">To the queue</span>
            </div>
            :
            null
          }
        </Modal>
        {userActive ?
          ""
          :
          <div className="alert alert-warning" role="alert">
            You have to be logged in to add a song!
          </div>
        }
        <table className="center text-center search-table">
          <thead>
            <tr>
              <th className="search-responsive" scope="col"></th>
              <th scope="col">Track</th>
              <th className="search-responsive" scope="col">Album</th>
              <th className="search-responsive" scope="col">Artist</th>
              <th scope="col">Explicit</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {result.map(item => (
              <tr key={item.uri} className="search-table-row">
                <td className="search-responsive">
                  <img src={item.album.images[2].url} />
                </td>
                <td>{item.name}</td>
                <td className="search-responsive">{item.album.name}</td>
                <td className="search-responsive">{item.artists[0].name}</td>
                <td>{item.explicit ? <img id="explicit_tag" src="static/img/explicit.png" width="60px" /> : null}</td>
                <td>
                  <FontAwesomeIcon className="hover" onClick={() => this.handleAdd(item)} icon="plus" />
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