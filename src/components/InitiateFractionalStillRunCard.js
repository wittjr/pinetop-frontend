import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
const crypto = require('../utils/crypto');

class InitiateFractionalStillRunCard extends Component {
  state = {
    headsTemp: 75,
    headsTime: 90,
    heartsTemp: 92,
    heartsTime: 240,
    tailsTemp: 99,
    tailsTime: 0,
    preHeatEndTemperature: 70,
    preHeatTime: 3,
    runTimeLimit: 15,
    stillDrainTime: 15,
    enteredPassPhrase: "",
    currentPassPhrase: process.env.REACT_APP_PASSWORD
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.startFractionalRun = this.startFractionalRun.bind(this);
    // this.startSimplifiedRun = this.startSimplifiedRun.bind(this);
  }

  startFractionalRun() {
    let fractionalStillInitiatingValues = JSON.stringify({
      headsTemp: this.state.headsTemp,
      headsTime: this.state.headsTime,
      heartsTemp: this.state.heartsTemp,
      heartsTime: this.state.heartsTime,
      tailsTemp: this.state.tailsTemp,
      tailsTime: this.state.tailsTime,
      preHeatEndTemperature: this.state.preHeatEndTemperature,
      preHeatTime: this.state.preHeatTime,
      runTimeLimit: this.state.runTimeLimit,
      stillDrainTime: this.state.stillDrainTime
    });
    axios
      .post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/startFractionalRun', {
        fractionalStillInitiatingValues
      })
      .then(res => {
        let message = res.data.message;
        this.setState({ message: message });
      });
  }

  // startSimplifiedRun() {
  //   axios.get('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/simplifiedprogram').then(res => {
  //     let message = res.data.message;
  //     this.setState({ message: message });
  //   });
  // }

  render() {
    return (
      <div>
        <Paper>
          <TextField
            id="preHeatEndTemperature"
            label="Preheat temperature"
            value={this.state.preHeatEndTemperature}
            helperText="Please input as a number"
            margin="normal"
            name="preHeatEndTemperature"
            onChange={this.onChange}
          />
          <TextField
            id="preHeatTime"
            label="Preheat time limit"
            value={this.state.preHeatTime}
            helperText="Enter in hours"
            margin="normal"
            name="preHeatTime"
            onChange={this.onChange}
          />
          <TextField
            id="headsTemp"
            label="Temperature to start collecting Heads"
            value={this.state.headsTemp}
            helperText="Please input as a number"
            margin="normal"
            name="headsTemp"
            onChange={this.onChange}
          />
          <TextField
            id="headsTime"
            label="Time to collect Heads"
            value={this.state.headsTime}
            helperText="Please input in minutes"
            margin="normal"
            name="headsTime"
            onChange={this.onChange}
          />
          <TextField
            id="heartsTemp"
            label="Temperature to start collecting Hearts"
            value={this.state.heartsTemp}
            helperText="Please input as a number"
            margin="normal"
            name="heartsTemp"
            onChange={this.onChange}
          />
          <TextField
            id="heartsTime"
            label="Time to collect Hearts"
            value={this.state.heartsTime}
            helperText="Please input in minutes"
            margin="normal"
            name="heartsTime"
            onChange={this.onChange}
          />
          <TextField
            id="tailsTemp"
            label="End temperature"
            value={this.state.tailsTemp}
            helperText="Please input in minutes"
            margin="normal"
            name="tailsTemp"
            onChange={this.onChange}
          />
          <TextField
            id="runTimeLimit"
            label="Run time limit"
            value={this.state.runTimeLimit}
            helperText="Please input in hours, the time limit for run after successful preheat"
            margin="normal"
            name="runTimeLimit"
            onChange={this.onChange}
          />
          <TextField
            id="stillDrainTime"
            label="Still drain time"
            value={this.state.stillDrainTime}
            helperText="Please input in minute, the amount of time to let the still drain after a run"
            margin="normal"
            name="stillDrainTime"
            onChange={this.onChange}
          />

          <br />
          <TextField
            id="enteredPassPhrase"
            name="enteredPassPhrase"
            label="Passphrase"
            defaultValue=""
            helperText="Please enter the passcode to start the fractional still"
            margin="normal"
            type="password"
            onChange={this.onChange}
          />
          <br />
          {crypto.checkPassword(this.state.enteredPassPhrase, this.state.currentPassPhrase) ? (
            <Button
              variant="contained"
              color="primary"
              onClick={this.startFractionalRun}
            >
              Start Fractional Run
            </Button>
          ) : (
            <div />
          )}
        </Paper>
      </div>
    );
  }
}

export default InitiateFractionalStillRunCard;
