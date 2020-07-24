import React, { Component } from 'react';
import {AreaChart} from 'react-easy-chart';

class HistoryGraphArea extends Component {
  constructor(props) {
    super(props);
    const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500;
    this.state = {windowWidth: initialWidth * .8};
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({windowWidth: window.innerWidth * .8});
  }

  render() {
    let graphData = [];
    if (this.props.graphData && this.props.graphData[0]) {
      this.props.graphData[0].forEach((row) => {
        graphData.push({
          x: row.x.split(" ")[0].split(":",2).join(":"),
          y: row.y
        })
      });
    }

    return (
      <div>
          <AreaChart
              xType={'text'}
              axes
              grid
              axisLabels={{x: 'Hour', y: 'Percentage'}}
              verticalGrid
              lineColors={['blue']}
              areaColors={['blue']}
              interpolate={'cardinal'}
              width={this.state.windowWidth}
              height={250}
              yDomainRange={[0,100]}
              data={[graphData]}
          />
      </div>
    )
  }
}

export default HistoryGraphArea;
