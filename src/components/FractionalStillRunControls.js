import React, {Component} from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class FractionalStillRunControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };

    this.stopRun = this.stopRun.bind(this);
    this.terminateRun = this.terminateRun.bind(this);
  }

  stopRun() {
    this.setState({
      message: 'Requested to gracefully stop the run, will skip to the drain process'
    })

    axios.post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/fractionalstill/endrun', {
      "type": "graceful"
    })
      .then(res => {
        let message = res.data.message;
        this.setState({
          message: message
        })
      })
  }

  terminateRun() {
    this.setState({
      message: 'Requested to end immediately terminate run, will turn off the heat and end the run'
    })

    axios.post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/fractionalstill/endrun', {
      "type": "immediate"
    })
      .then(res => {
        let message = res.data.message;
        this.setState({
          message: message
        })
      })
  }

  render() {
    const style = {
      textAlign: 'center'
    }

    return (
      <div>
        <Paper>
          <Grid container spacing={16} justify = "space-evenly">
            <Grid item>
            <Button variant = "contained" color = "primary" onClick = {this.stopRun}>
              Gracefully Stop Run
            </Button>
            </Grid>
            <Grid item>
            <Button variant = "contained" color = "primary" onClick = {this.terminateRun}>
              Terminate Run
            </Button>
            </Grid>
            <Grid item xs={12} style={style}>
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

export default (FractionalStillRunControls);
