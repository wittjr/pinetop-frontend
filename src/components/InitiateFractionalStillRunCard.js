import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
const crypto = require('../utils/crypto');

const styles = theme => ({
  wrapfield: {
    margin: '25px',
  },
  header: {
    width: 'auto',
    margin: 'auto',
    fontWeight: 'bold',
    fontSize: '1.25rem'
  },
  footer: {
    width: 'auto',
    margin: 'auto'
  }
});

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
    cycleSolenoidWhileHeating: true,
    enteredPassPhrase: "",
    currentPassPhrase: process.env.REACT_APP_PASSWORD
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: parseFloat(e.target.value) });
  }

  onStringChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheckboxChange(e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onStringChange = this.onStringChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
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
      stillDrainTime: this.state.stillDrainTime,
      cycleSolenoidWhileHeating: this.state.cycleSolenoidWhileHeating
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
    const { classes } = this.props;
    return (
      <div>
        <Paper>
          <div style={{ padding: 30 }}>
            <Grid container direction="row" alignContent="center" justify="center" spacing={24}>
              <Grid item xs={12} container spacing={24}>
                <FormLabel
                  className={classes.header}
                >Preheat</FormLabel>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="preHeatEndTemperature"
                  label="Preheat temperature (Celsius)"
                  value={this.state.preHeatEndTemperature}
                  helperText="Target temperature to reach before starting to collect. The solenoid will be closed during preheat."
                  margin="normal"
                  className={classes.wrapfield}
                  name="preHeatEndTemperature"
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="preHeatTime"
                  label="Preheat time limit (hours)"
                  value={this.state.preHeatTime}
                  helperText="If the preheat temperature is not reached by this time limit, the process will be stopped."
                  margin="normal"
                  name="preHeatTime"
                  className={classes.wrapfield}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12} container spacing={24}>
                <FormLabel className={classes.footer}>After reaching the preheat temp, the Heads process will start.</FormLabel>
              </Grid>
            </Grid>
          </div>
          <Divider/>
          <div style={{ padding: 30 }}>
            <Grid container direction="row" alignContent="center" justify="center" spacing={24}>
              <Grid item xs={12} container spacing={24}>
                <FormLabel
                  className={classes.header}
                >Heads</FormLabel>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="headsTemp"
                  label="Target Heads temperature (Celsius)"
                  value={this.state.headsTemp}
                  helperText="Open the solenoid and heat up to this temperature collecting as Heads."
                  margin="normal"
                  name="headsTemp"
                  className={classes.wrapfield}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="headsTime"
                  label="Hold time to collect Heads (minutes)"
                  value={this.state.headsTime}
                  helperText="Once the target Heads temperature is reached, attempt to hold the temperature for this length. Set to 0 to skip the hold phase and continue heating. After this time, the solenoid will close and the arm will move to the next position."
                  margin="normal"
                  name="headsTime"
                  className={classes.wrapfield}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12} container spacing={24}>
                <FormLabel className={classes.footer}>After reaching the Heads temp and executing any desired hold, the Hearts process will start.</FormLabel>
              </Grid>
            </Grid>
          </div>
          <Divider/>
          <div style={{ padding: 30 }}>
            <Grid container direction="row" alignContent="center" justify="center" spacing={24}>
              <Grid item xs={12} container spacing={24}>
                  <FormLabel
                    className={classes.header}
                  >Hearts</FormLabel>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="heartsTemp"
                    label="Target Hearts temperature (Celsius)"
                    value={this.state.heartsTemp}
                    helperText="Open the solenoid and heat up to this temperature collecting as Hearts."
                    margin="normal"
                    name="heartsTemp"
                    className={classes.wrapfield}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="heartsTime"
                    label="Hold time to collect Hearts (minutes)"
                    value={this.state.heartsTime}
                    helperText="Once the target Hearts temperature is reached, attempt to hold the temperature for this length. Set to 0 to skip the hold phase and continue heating. After this time, the solenoid will close and the arm will move to the next position."
                    margin="normal"
                    name="heartsTime"
                    className={classes.wrapfield}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} container spacing={24}>
                  <FormLabel className={classes.footer}>After reaching the Hearts temp and executing any desired hold, the Tails process will start.</FormLabel>
                </Grid>
              </Grid>
            </div>
            <Divider/>
            <div style={{ padding: 30 }}>
              <Grid container direction="row" alignContent="center" justify="center" spacing={24}>
                <Grid item xs={12} container spacing={24}>
                  <FormLabel
                    className={classes.header}
                  >Tails</FormLabel>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="tailsTemp"
                    label="End temperature (Celsius)"
                    value={this.state.tailsTemp}
                    helperText="Open the solenoid and heat up to this temperature collecting as Tails."
                    margin="normal"
                    name="tailsTemp"
                    className={classes.wrapfield}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="stillDrainTime"
                    label="Still drain time (minutes)"
                    value={this.state.stillDrainTime}
                    helperText="The amount of time to let the still drain after a run"
                    margin="normal"
                    name="stillDrainTime"
                    className={classes.wrapfield}
                    onChange={this.onChange}
                  />
                </Grid>
              </Grid>
            </div>
            <Divider/>
            <div style={{ padding: 30 }}>
              <Grid container direction="row" alignContent="center" justify="center" spacing={24}>
                <Grid item xs={12} container spacing={24}>
                  <FormLabel
                    className={classes.header}
                  >General Settings</FormLabel>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="runTimeLimit"
                    label="Post-preheat run time limit (hours)"
                    value={this.state.runTimeLimit}
                    helperText="The time limit for the run after a successful preheat"
                    margin="normal"
                    name="runTimeLimit"
                    className={classes.wrapfield}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="cycleSolenoidWhileHeating"
                        checked={this.state.cycleSolenoidWhileHeating}
                        margin="normal"
                        name="cycleSolenoidWhileHeating"
                        onChange={this.onCheckboxChange}
                      />
                    }
                    label="Cycle the solenoid while heating (does not apply to preheat, experiment to see if it helps heating times)"
                  />
                </Grid>
              </Grid>
            </div>
            <Divider/>
            <div style={{ padding: 30 }}>
              <Grid container direction="row" alignContent="center" justify="center" spacing={24}>
                <Grid item xs={12} container spacing={24}>
                  <FormLabel
                    className={classes.header}
                  >Fire it up</FormLabel>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="enteredPassPhrase"
                    name="enteredPassPhrase"
                    label="Passphrase"
                    defaultValue=""
                    helperText="Please enter the passcode to start the fractional still"
                    margin="normal"
                    type="password"
                    className={classes.wrapfield}
                    onChange={this.onStringChange}
                  />
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
                </Grid>
              </Grid>
            </div>
        </Paper>
      </div>
    );
  }
}

InitiateFractionalStillRunCard.propTypes = {
};

export default withStyles(styles)(InitiateFractionalStillRunCard);
