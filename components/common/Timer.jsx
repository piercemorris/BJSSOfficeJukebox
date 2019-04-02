import React, { Component } from 'react';

class Timer extends Component { //time and function to call
  state = {
    running: false,
    lapse: 0
  }

  componentDidMount() {
    this.handleTimeStart();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleTimeStart = () => {
    this.setState(state => {
      if (state.running) {
        clearInterval(this.timer);
      }
      else {
        const startTime = Date.now() - this.state.lapse;
        this.timer = setInterval(() => {
          if (this.state.lapse >= this.props.time) {
            this.setState({ lapse: 0 });
            clearInterval(this.timer);
            this.props.onUpdate();
            this.handleTimeStart();
          } else {
            this.setState({
              lapse: Date.now() - startTime
            });
          }
        });
      }
    })
  }

  render() {
    return (
      <div className="update-timer">
        <input
          className="update-timer__input"
          type="range"
          readOnly
          value={this.state.lapse}
          min="0"
          max={this.props.time}
        />
      </div>
    );
  }
}

export default Timer;