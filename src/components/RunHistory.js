import React, { Component } from 'react';
import axios from 'axios';
import RunHistorySelect from './RunHistorySelect';
import HistoryGraphArea from './HistoryGraphArea';
import RunSummary from './RunSummary';

export default class RunHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: [],
      toBeGraphed: [],
      runData: {},
      selectedRun: ''
    };

    // toBeGraphed.push(props.graphData);
    this.handleOptionChoice = this.handleOptionChoice.bind(this);
    this.getRuns = this.getRuns.bind(this);
    this.getTimedata = this.getTimedata.bind(this);
  }

  handleOptionChoice(batchID) {
    this.getTimedata(batchID);
		// this.setState(
		// 	{
		// 		toBeGraphed: []
		// 	},
		// 	() => {
		// 		console.log(this.state);
		// 		console.log(this.state);
		// 	}
		// );
  }

  getRuns () {
    axios.get('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/rundata')
        .then(res => {
          // console.log(res);
          let data = res.data.data;
          let runs = [];
          let runData = [];
          data.forEach((row) => {
            runs.push({
              id: row.batchID,
              name: (new Date(row.starttime)).toLocaleString() + ' - ' + row.operation
            });
            runData[row.batchID] = Object.assign({}, row);
          });

          this.setState({choices: runs});
          this.setState({runData: runData});
        })
  }

  getTimedata (batchID) {
    axios.get('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/historicaldata/' + batchID)
        .then(res => {
          let newDataPoints = [];
          res.data.data.forEach((datapoint) => {
            newDataPoints.push({
              x: (new Date(datapoint.timestamp)).toLocaleTimeString(),
              y: datapoint.temperature
            });
          });
          this.setState({toBeGraphed: [newDataPoints]});
          this.setState({selectedRun: batchID});
        })
  }

  componentDidMount() {
    this.getRuns();
  }

  render () {
    return (
      <div>
        <RunHistorySelect
          handleOptionChoice={this.handleOptionChoice}
          choices={this.state.choices}
        />
        {this.state.selectedRun &&
          <HistoryGraphArea
            graphData={this.state.toBeGraphed}
          />
        }
        {this.state.selectedRun &&
          <RunSummary
            batchID={this.state.selectedRun}
            runData={this.state.runData[this.state.selectedRun]}
          />
        }
      </div>
    );
  }
}
