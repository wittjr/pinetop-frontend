import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
const crypto = require('../utils/crypto');

class InitiateFractionalStillCard extends Component {
  state = {
    startAlcohol: 0.3,
    startVolume: 38.8,
    collectionCoefficient: 1.75,
    lastFractionForHeads: 5,
    lastFractionForHearts: 16,
    preHeatEndTemperature: 45,
    methanolPercent: 0.03,
    volumeHeadsPercent: 0.05,
    volumeTailsPercent: 0.05,
    preHeatTime: 3,
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
    this.startSimplifiedRun = this.startSimplifiedRun.bind(this);
  }

  startFractionalRun() {
    let fractionalStillInitiatingValues = JSON.stringify({
      startAlcohol: this.state.startAlcohol,
      startVolume: this.state.startVolume,
      collectionCoefficient: this.state.collectionCoefficient,
      lastFractionForHeads: this.state.lastFractionForHeads,
      lastFractionForHearts: this.state.lastFractionForHearts,
      preHeatEndTemperature: this.state.preHeatEndTemperature,
      methanolPercent: this.state.methanolPercent,
      volumeHeadsPercent: this.state.volumeHeadsPercent,
      volumeTailsPercent: this.state.volumeTailsPercent,
      preHeatTime: this.state.preHeatTime
    });
    axios
      .post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/setfractional', {
        fractionalStillInitiatingValues
      })
      .then(res => {
        let message = res.data.message;
        this.setState({ message: message });
      });
  }

  startSimplifiedRun() {
    axios.get('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/simplifiedprogram').then(res => {
      let message = res.data.message;
      this.setState({ message: message });
    });
  }

  render() {
    return (
      <div>
        <Paper>
          <TextField
            id="startVolume"
            name="startVolume"
            label="Starting Volume in Liters"
            value={this.state.startVolume}
            helperText="Please input as a decimal"
            margin="normal"
            onChange={this.onChange}
          />
          <TextField
            id="startAlcohol"
            label="Starting Alcohol Percent"
            value={this.state.startAlcohol}
            helperText="Please input as a decimal"
            margin="normal"
            name="startAlcohol"
            onChange={this.onChange}
          />
          <TextField
            id="methanolPercent"
            label="Methanol Percent"
            value={this.state.methanolPercent}
            helperText="Please input as a decimal"
            margin="normal"
            name="methanolPercent"
            onChange={this.onChange}
          />
          <TextField
            id="volumeHeadsPercent"
            label="Heads Percent"
            value={this.state.volumeHeadsPercent}
            helperText="Please input as a decimal"
            margin="normal"
            name="volumeHeadsPercent"
            onChange={this.onChange}
          />
          <TextField
            id="volumeTailsPercent"
            label="Tails Percent"
            value={this.state.volumeTailsPercent}
            helperText="Please input as a decimal"
            margin="normal"
            name="volumeTailsPercent"
            onChange={this.onChange}
          />
          <br />
          <TextField
            id="collectionCoefficient"
            label="Collection coefficient"
            value={this.state.collectionCoefficient}
            helperText="Please input as a decimal"
            margin="normal"
            name="collectionCoefficient"
            onChange={this.onChange}
          />
          <TextField
            id="lastFractionForHeads"
            label="End of heads"
            value={this.state.lastFractionForHeads}
            helperText="Please input as a decimal"
            margin="normal"
            name="lastFractionForHeads"
            onChange={this.onChange}
          />
          <TextField
            id="lastFractionForHearts"
            label="End of hearts"
            value={this.state.lastFractionForHearts}
            helperText="Please input as a decimal"
            margin="normal"
            name="lastFractionForHearts"
            onChange={this.onChange}
          />
          <TextField
            id="preHeatEndTemperature"
            label="Preheat temperature"
            value={this.state.preHeatEndTemperature}
            helperText="Please input as a decimal"
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
          />          <br />
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

export default InitiateFractionalStillCard;
