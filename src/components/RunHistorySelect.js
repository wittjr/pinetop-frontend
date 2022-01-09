import React, { Component } from 'react';

export default class RunHistorySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: ''
      // choices: props.choices
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateGraphData = this.updateGraphData.bind(this);
  }

  updateGraphData() {
    this.props.handleOptionChoice(this.state.choice);
  }

  handleChange = (e) => {
    let idx = e.target.selectedIndex;
    let choice = e.target.options[idx].value;
    this.setState({choice: choice}, this.updateGraphData);
  }

  render () {
    let runList = this.props.choices.length > 0
    	&& this.props.choices.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name} - {Math.floor(item.length/60)}:{(Math.round(item.length%60)+"").padStart(2,"0")}</option>
      )
    }, this);

    return (
      <div>
        <select defaultValue="" onChange={this.handleChange}>
          <option disabled="disabled" value="">start date, start time - still type - time length (hours:minutes)</option>
          {runList}
        </select>
      </div>
    );
  }
}
