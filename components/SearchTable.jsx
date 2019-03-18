import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import songs from "../services/songService";
import user from "../services/userService";
import Modal from "../components/common/Modal";
import renderPlaceholder from "./Placeholder";

class SearchTable extends Component {
  state = {
    itemsToShow: 3,
    userActive: false,
    expanded: false,
    show: false,
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
    location.reload();
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
        {this.props.result!=0 ? (
                  <div>
                  <table className="SearchTable center center-text search-table">
                    <tbody>
                  {this.props.result.slice(0, this.state.itemsToShow).map((song, i) =>
                    <tr onClick={() => this.handleAdd(song) }>
                    <td key={i}><img src={song.album.images[2].url} /></td>
                    <td >{song.name}</td>
                    <td >{song.artists[0].name}</td>
                    </tr>
                  )}
                  <tr onClick={this.showMore}>
                  <td className="showButton" colSpan='3'>
                    <a onClick={this.showMore}>  
                      {this.state.expanded ? (
                        <span>Show less</span>
                        ) : (
                        <span>Show more</span>
                        )
                      }
                      </a>
                    </td>
                  </tr>
                    </tbody>
                  </table>
                </div>
        
        ):(
          <div></div>
        )
        }
      </React.Fragment>
    );
  }
}

export default SearchTable;