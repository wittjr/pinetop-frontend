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
    let data = {
      result: {
        ...this.props.runData.result,
        volume: parseFloat(this.state.volume),
        percent: parseFloat(this.state.percent),
        notes: this.state.notes
      }
    };

    axios.post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/rundata/' + this.props.batchID,
      data
    )
        .then(res => {
            let message = res.data.message;
            this.setState({message:message})
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
