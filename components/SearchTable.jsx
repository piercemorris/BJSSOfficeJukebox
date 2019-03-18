import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import songs from "../services/songService";
import user from "../services/userService";
import renderPlaceholder from "./Placeholder";

class SearchTable extends Component {
  constructor(props) {
    super(props) 
  this.state = {
    itemsToShow: 3,
    expanded: false,
    userActive: false
  };
  this.showMore = this.showMore.bind(this);
}
showMore() {
  this.state.itemsToShow === 3 ? (
    this.setState({ itemsToShow: 7, expanded: true })
    ) : (
      this.setState({ itemsToShow: 3, expanded: false })
    )
  }

  async handleAdd(song) {
    const currentUser = await user.getCurrentUser();
    const response = songs.addSong({ song }, currentUser._id, currentUser.username);
    location.reload();
  }

  async componentWillMount() {
    const response = await user.getCurrentUser();
    if (response) {
      this.setState({ userActive: true });
    }
  }

  render() {
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