import { GET_HISTORICAL_GRAPH_DATA, GET_POT_RUN_OVERVIEW, GET_POT_GRAPH_DATA } from './types'
import axios from "axios"
import store from '../store'

export const getPotRunOverview = () => dispatch => {
    let serverString = 'http://' + process.env.REACT_APP_PHIDGET_SERVER + '/potsummary'
    axios.get(serverString)
        .then(res => {
            return res.data.serverPotOverview;
        })
        .then(serverPotOverview => dispatch({
                type:GET_POT_RUN_OVERVIEW,
                payload:serverPotOverview
            })
        )
}

export const getPotGraphData = () => dispatch => {
    let serverString = 'http://' + process.env.REACT_APP_PHIDGET_SERVER + '/potgraphdata'
    let theState = store.getState();
    let lastGraphPointID =  theState.potStill.graphData.length > 1 ? theState.potStill.graphData[theState.potStill.graphData.length -1].id : 0;
    axios.get(serverString)
        .then(res => {
            let newDataPoints = res.data.potGraphData.filter(dataPoint => dataPoint.id > lastGraphPointID);
            return newDataPoints;
        })
        .then(newDataPoints => dispatch({
                type:GET_POT_GRAPH_DATA,
                payload:newDataPoints
            })
        )
}

export const getHistoricalData = () => dispatch => {
    let serverString = 'http://' + process.env.REACT_APP_PHIDGET_SERVER + '/historicaldata'
    // let theState = store.getState();
    // let lastGraphPointID =  theState.potStill.graphData.length > 1 ? theState.potStill.graphData[theState.potStill.graphData.length -1].id : 0;
    axios.get(serverString)
        .then(res => {
          let newDataPoints = [];
          res.data.data.forEach((datapoint) => {
            newDataPoints.push({
              x: (new Date(datapoint.timestamp)).toLocaleTimeString(),
              y: datapoint.temperature
            });
          });
          // let newDataPoints = res.data.potGraphData.filter(dataPoint => dataPoint.id > lastGraphPointID);
          return newDataPoints;
        })
        .then(newDataPoints => dispatch({
                type:GET_HISTORICAL_GRAPH_DATA,
                payload:newDataPoints
            })
        )
}
