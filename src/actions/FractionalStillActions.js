import { GET_FRACTIONAL_STILL_GRAPH_DATA, GET_FRACTIONAL_STILL_RUN_OVERVIEW } from './types'
import axios from "axios"
import store from '../store'

export const getRunOverview = () => dispatch => {
    let serverString = 'http://' + process.env.REACT_APP_PHIDGET_SERVER + '/fractionalStillSummary'
    axios.get(serverString)
        .then(res => {
            return res.data.serverRunOverview;
        })
        .then(serverRunOverview => dispatch({
                type:GET_FRACTIONAL_STILL_RUN_OVERVIEW,
                payload:serverRunOverview
            })
        )
}

export const getGraphData = () => dispatch => {
    let serverString = 'http://' + process.env.REACT_APP_PHIDGET_SERVER + '/fractionalStillGraphData'
    let theState = store.getState();
    let lastGraphPointID =  theState.fractionalStill.fractionalGraphData.length > 1 ? theState.fractionalStill.fractionalGraphData[theState.fractionalStill.fractionalGraphData.length -1].id : 0;
    axios.get(serverString)
        .then(res => {
            let newDataPoints = res.data.fractionalGraphData.filter(dataPoint => dataPoint.id > lastGraphPointID);
            return newDataPoints;
        })
        .then(newDataPoints => dispatch({
                type:GET_FRACTIONAL_STILL_GRAPH_DATA,
                payload:newDataPoints
            })
        )
}
