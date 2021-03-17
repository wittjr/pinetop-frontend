import React, {Component} from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class FractionalStillButtons extends Component {
  constructor(props) {
    axios.get('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/fractionalstill/heat')
      .then(res => {
        let message = res.data.message;
        if (message) {
          this.setState({
            heatStatus: 'on'
          })
        } else {
          this.setState({
            heatStatus: 'off'
          })
        }
      })
    axios.get('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/fractionalstill/solenoid')
      .then(res => {
        let message = res.data.message;
        if (message) {
          this.setState({
            solenoidStatus: 'open'
          })
        } else {
          this.setState({
            solenoidStatus: 'closed'
          })
        }
      })
    super(props);
    this.state = {
      message: ''
    };

    this.positionArmHeads = this.positionArmHeads.bind(this);
    this.positionArmHearts = this.positionArmHearts.bind(this);
    this.positionArmTails = this.positionArmTails.bind(this);

    this.openValve = this.openValve.bind(this);
    this.closeValve = this.closeValve.bind(this);
    this.heatOff = this.heatOff.bind(this);
    this.heatOn = this.heatOn.bind(this);
    this.checkTemp = this.checkTemp.bind(this);
  }

  positionArmHeads() {
    this.setState({
      message: 'Requested to move arm to heads position'
    })

    axios.post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/fractionalstill/movearm', {
        "position": "heads"
      })
      .then(res => {
        let message = res.data.message;
        this.setState({
          message: message
        })
      })
  }

  positionArmHearts() {
    this.setState({
      message: 'Requested to move arm to hearts position'
    })

    axios.post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/fractionalstill/movearm', {
        "position": "hearts"
      })
      .then(res => {
        let message = res.data.message;
        this.setState({
          message: message
        })
      })
  }

  positionArmTails() {
    this.setState({
      message: 'Requested to move arm to tails position'
    })

    axios.post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/fractionalstill/movearm', {
        "position": "tails"
      })
      .then(res => {
        let message = res.data.message;
        this.setState({
          message: message
        })
      })
  }

  openValve() {
    axios.post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/fractionalstill/solenoid', {
      "state": "open"
    })
      .then(res => {
        let message = res.data.message;
        if (message) {
          this.setState({
            solenoidStatus: 'open'
          })
        } else {
          this.setState({
            solenoidStatus: 'closed'
          })
        }
      })
  }

  closeValve() {
    axios.post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/fractionalstill/solenoid', {
    "state": "close"
    })
      .then(res => {
        let message = res.data.message;
        if (message) {
          this.setState({
            solenoidStatus: 'open'
          })
        } else {
          this.setState({
            solenoidStatus: 'closed'
          })
        }
      })
  }

  heatOn() {
    axios.post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/fractionalstill/heat', {
      "state": "on"
    })
      .then(res => {
        let message = res.data.message;
        if (message) {
          this.setState({
            heatStatus: 'on'
          })
        } else {
          this.setState({
            heatStatus: 'off'
          })
        }
      })
  }

  heatOff() {
    axios.post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/fractionalstill/heat', {
      "state": "off"
    })
      .then(res => {
        let message = res.data.message;
        if (message) {
          this.setState({
            heatStatus: 'on'
          })
        } else {
          this.setState({
            heatStatus: 'off'
          })
        }
      })
  }

  checkTemp() {
    this.setState({
      message: 'Requested temperature'
    })

    axios.get('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/fractionalstill/heat')
      .then(res => {
        let message = res.data.message;
        this.setState({
          message: 'Current temp:' + message
        })
      })
  }

  render() {
    const style = {
      textAlign: 'right'
    }

    return (
      <div>
        <Paper>
          <Grid container spacing={16} justify = "space-evenly">
            <Grid item>
            <Button variant = "contained" color = "primary" onClick = {this.positionArmHeads}>
              Set Arm Heads
            </Button>
            </Grid>
            <Grid item>
            <Button variant = "contained" color = "primary" onClick = {this.positionArmHearts}>
              Set Arm Hearts
            </Button>
            </Grid>
            <Grid item>
            <Button variant = "contained" color = "primary" onClick = {this.positionArmTails}>
              Set Arm Tails
            </Button>
            </Grid><Grid item>
            <Button variant = "contained" color = "primary" onClick = {this.openValve}>
              Open Solenoid
            </Button>
            </Grid><Grid item >
            <Button variant = "contained" color = "primary" onClick = {this.closeValve}>
              Close Solenoid
            </Button>
            </Grid><Grid item >
            <Button variant = "contained" color = "primary" onClick = {this.checkTemp}>
              Check Temp
            </Button>
            </Grid><Grid item >
            <Button variant = "contained" color = "secondary" onClick = {this.heatOn}>
              Heat On
            </Button>
            </Grid><Grid item >
            <Button variant = "contained" color = "secondary" onClick = {this.heatOff}>
              Heat Off
            </Button>
            </Grid>
            <Grid item xs={6} style={style} >
              Solenoid Status: {
                this.state.solenoidStatus
              }
            </Grid>
            <Grid item xs={6}>
              Heating Element status: {
                this.state.heatStatus
              }
            </Grid>
            <Grid item>
              {
                this.state.message
              }
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default (FractionalStillButtons);
