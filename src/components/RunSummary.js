import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import PotRunSummary from './PotRunSummary';
import FractionalRunSummary from './FractionalRunSummary';
import axios from 'axios';

const styles = theme => ({
  root: {
    display: 'block',
  },
  headline: {
    width: '100%',
    'text-align': 'center'
  },
  grid: {
    display: 'flex',
    'justify-content': 'space-evenly',
    'flex-wrap': 'wrap'
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: 'center',
    padding: '10px',
  },
});

class RunSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };

    this.onChange = this.onChange.bind(this);
    this.saveResult = this.saveResult.bind(this);
  };

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  saveResult() {
    const data = {};
    if (this.props.runData.operation === 'pot') {
      data.result = {
        ...this.props.runData.result,
        volume: parseFloat(this.state.volume),
        percent: parseFloat(this.state.percent),
        notes: this.state.notes
      };
    } else {
      data.result = {
        ...this.props.runData.result,
        headsVolume: parseFloat(this.state.headsVolume),
        headsPercent: parseFloat(this.state.headsPercent),
        heartsVolume: parseFloat(this.state.heartsVolume),
        heartsPercent: parseFloat(this.state.heartsPercent),
        tailsVolume: parseFloat(this.state.tailsVolume),
        tailsPercent: parseFloat(this.state.tailsPercent),
        notes: this.state.notes
      };
    }

    axios.post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/rundata/' + this.props.batchID,
      data
    )
        .then(res => {
            //let message = res.data.message;
            //this.setState({message:message})
            this.props.runData.result = {
              ...data.result
            }
            this.setState({});
        })
  };

  render() {
    const { classes } = this.props;
    const runData = this.props.runData;
    const hasInput = runData.input;
    return (
      <div>
        {hasInput &&
          <Paper className={classes.root}>
            {runData.operation === 'pot' ?
              <PotRunSummary
                runData={runData}
                change={this.onChange}
                click={this.saveResult}
              />
            :
              <FractionalRunSummary
                runData={runData}
                change={this.onChange}
                click={this.saveResult}
              />
            }
          </Paper>
        }
      </div>
    )
  }
};

RunSummary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RunSummary);
