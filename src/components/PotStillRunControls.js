import React, {Component} from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class PotStillRunControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };

    this.stopRun = this.stopRun.bind(this);
  }

  stopRun() {
    this.setState({
      message: 'Requested to gracefully stop the run'
    })

    axios.post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/potstill/endrun', {
      "type": "graceful"
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
              Stop Run
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

export default (PotStillRunControls);
