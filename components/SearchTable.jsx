import React, { Component } from "react";
import _ from "lodash";
import songs from "../services/songService";
import user from "../services/userService";
import Modal from "../components/common/Modal";
import Link from "next/link";

class SearchTable extends Component {
  state = {
    itemsToShow: 3,
    userActive: false,
    expanded: false,
    show: false,
    showSearch: false,
    addedSong: ""
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  }

  showMore = () => {
    this.state.itemsToShow === 3 ? (
      this.setState({ itemsToShow: 7, expanded: true })
    ) : (
        this.setState({ itemsToShow: 3, expanded: false })
      )
  }

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
    const { result, authorised } = this.props;
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
        <div className="search-results">
          {!userActive ?
            <div className="msg--error">
              You have to be logged into a Jukebox account to add a song!
              <Link href="/login">
                <button className="btn btn-standard margin-text-sm">Log in</button>
              </Link>
            </div>
            :
            <>
              {!authorised ?
                <div className="msg--error">
                  You need to have Spotify added to your device account!
                </div>
                :
                <>
                  {_.isEmpty(result) ?
                    <div className="msg--error">
                      No search results! Try searching for another song...
                  </div>
                    :
                    <>
                      <table className="search-results__table">
                        <tbody>
                          <tr className="search-results__table-header">
                            <th className="search-results__table-header-img"></th>
                            <th className="search-results__table-header-title">Title</th>
                            <th className="search-results__table-header-artist">Artist</th>
                            <th className="search-results__table-header-button"></th>
                          </tr>
                          {result.slice(0, this.state.itemsToShow).map((song, i) =>
                            <tr className="search-results__table__content">
                              <td key={i}><img src={song.album.images[2].url} /></td>
                              <td>{song.name}</td>
                              <td>{song.artists[0].name}</td>
                              <td><button className="btn btn-add" onClick={() => this.handleAdd(song)}>Add song</button></td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      <div className="search-results__show">
                        <button onClick={this.showMore} className="btn btn-add">
                          {this.state.expanded ?
                            <span>Show less</span>
                            :
                            <span>Show more</span>
                          }
                        </button>
                      </div>
                    </>
                  }
                </>
              }
            </>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default SearchTable;