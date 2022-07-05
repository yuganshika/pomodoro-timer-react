import React from 'react';
import ReactDom from 'react-dom';
import Title from 'react-title-component';
import Footer from './../Footer/Footer';
export default class Pomodoro extends React.Component {

  constructor() {
    super();
    this.state = {
      time: 0,
      play: false,
      timeType: 0,
      title: ''
    };

    this.setTimeFort = this.setTime.bind(this, 1500);
    this.setTimeForf = this.setTime.bind(this, 300);
    this.setTimeForft = this.setTime.bind(this, 900);
    this.reset = this.reset.bind(this);
    this.play = this.play.bind(this);
    this.elapseTime = this.elapseTime.bind(this);
  }

  componentDidMount() {
    this.setDefaultTime();
    this.startShortcuts();

  }

  elapseTime() {
    if (this.state.time === 0) {
      this.reset(0);
      this.alert();
    }
    if (this.state.play === true) {
      let newState = this.state.time - 1;
      this.setState({
        time: newState,
        title: this.getTitle(newState)
      });
    }
  }

  format(seconds) {
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);
    let timeFormated = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    return timeFormated;
  }

  getFormatTypes() {
    return [{
        type: "t",
        time: 1500
      },
      {
        type: "f",
        time: 300
      },
      {
        type: "ft",
        time: 900
      }
    ];
  }

  formatType(timeType) {
    let timeTypes = this.getFormatTypes();
    for (let i = 0; i < timeTypes.length; i++) {
      let timeObj = timeTypes[i];
      if (timeObj.time === timeType) {
        return timeObj.type;
      }
    }
    return null;
  }

  restartInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(this.elapseTime, 1000);
  }

  play() {
    if (true === this.state.play) return;

    this.restartInterval();

    this.setState({
      play: true
    });
  }

  reset(resetFor = this.state.time) {
    clearInterval(this.interval);
    let time = this.format(resetFor);
    this.setState({
      play: false
    });
  }

  togglePlay() {
    if (true === this.state.play)
      return this.reset();

    return this.play();
  }

  setTime(newTime) {
    this.restartInterval();

    this.setState({
      time: newTime,
      timeType: newTime,
      title: this.getTitle(newTime),
      play: true
    });
  }

  setDefaultTime() {
    let defaultTime = 1500;

    this.setState({
      time: defaultTime,
      timeType: defaultTime,
      title: this.getTitle(defaultTime),
      play: false
    });
  }

  getTitle(time) {
    time = typeof time === 'undefined' ? this.state.time : time;
    let _title = this.format(time) + ' | Pomodoro timer';
    return _title;
  }


  alert() {

    if (this.state.timeType === 1500) {
      window.alert("Take a break!");
    } else {
      window.alert("Break is over get back to work!");
    }
  }

  render() {

    return ( <
      div className = "pomodoro" >


      <
      Title render = {
        this.state.title
      }
      />


      <
      div className = "main" >

      <
      div className = "container display timer" >
      <
      span className = "time" > {
        this.format(this.state.time)
      } < /span>

      <
      /div>

      <
      div className = "container display types" >
      <
      button className = "btn t"
      onClick = {
        this.setTimeFort
      } > 25 min < /button> <
      button className = "btn f"
      onClick = {
        this.setTimeForf
      } > 5 min < /button> <
      button className = "btn ft"
      onClick = {
        this.setTimeForft
      } > 15 min < /button> <
      /div>

      <
      div className = "container" >
      <
      div className = "controlsPlay" >
      <
      button className = "play btnIcon"
      onClick = {
        this.play
      } > < /button> <
      button className = "stop btnIcon"
      onClick = {
        this.reset
      } > < /button> <
      /div> <
      /div>

      <
      /div>


      <
      div className = "bottomBar" >



      <
      Footer / >

      <
      /div> {}

      <
      /div>
    );
  }
};
