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

  createTable(table,num){
    let length=3
    if(num==1){
      length=this.props.result.length
    }
      for (var i = 0; i < length; i++) {
      let children = []
      console.log(222)
      // create children
      children.push(<td><img src={this.props.result[i].album.images[2].url} /></td>)
      children.push(<td>{this.props.result[i].name}</td>)
      children.push(<td>{this.props.result[i].artists[0].name}</td>)
      //Create the parent and add the children
      table.push(<tr onClick={() => this.handleAdd(this.props.result[i])}>{children}</tr>)
    }
}
  render() {
    const { result } = this.props;
    let table=[]
    {this.createTable(table,0)}
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






