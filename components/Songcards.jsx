import React, { Component } from "react";
import Songcard from "./Songcard";
import axios from "axios";
import PriorityQueues from "./PriorityQueues";


class Songcards extends Component {

  state = {
    songs: null,
    temp: null
  };

  async componentDidMount() {
    const apiEndpoint = "http://localhost:3000/api/songs/";
    const response = await axios
      .get(apiEndpoint)
      .then()
      .catch(err => console.log(err));
    console.log(response.data);
    this.setState({ temp: response.data });


    console.log(this.state.temp[1].song.track_number);
    
    var songsQueue = new PriorityQueues(); // initially empty
    this.state.temp.map(song => (
      songsQueue.enqueue(song,song.song.track_number)
    ))
    this.setState({ songs: songsQueue });
    console.log(this.state.songs);

  }
  render() {
    return (
      <div className="songcards">
        <h1>Currently Playing</h1>
        {this.state && this.state.songs && (
                <Songcard 
                song={this.state.songs.items[0].element.song}
                priority={Math.floor(Math.random() * (5 - 1 + 1) + 1)} 
              />
        
          
)}
        <h1>Queue</h1>
        {this.state && this.state.songs && this.state.songs.items
            .filter(song => this.state.songs.items.indexOf(song) != 0)
            .map(song => (
              <Songcard 
              song={song.element.song}
              priority={Math.floor(Math.random() * (5 - 1 + 1) + 1)} 
            />
            ))}


</div>
    );
  }
}

export default Songcards;
