import React, { Component } from 'react';

/**
 * @api {Class Component} <Timer|time|onUpdate/> common/Timer.jsx
 * @apiName Timer
 * @apiGroup Components
 * @apiParam {Integer} time Text time 
 * @apiParam {Function} onUpdate Function to be called once the supplied time is reached
 * @apiDescription  A timer component for simulating a stop watch. Once the supplied time is reach, the onUpdate function
 *                  will get called internally. The ouput is in the form of a input slider.
 * @apiSuccessExample Songcards.jsx
 *    <Timer time={this.state.time} onUpdate={this.updateSongQueue} />
 */
class Timer extends Component {
  state = {
    running: false,
    lapse: 0
  }

  // once the component rendered, start the timer
  componentDidMount() {
    this.handleTimeStart();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // logic for handling the time
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