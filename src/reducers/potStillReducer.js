import { GET_HISTORICAL_GRAPH_DATA, GET_POT_GRAPH_DATA, GET_POT_RUN_OVERVIEW } from '../actions/types'

const initialState = {
  historicalData: [],
  graphData: [],
  serverPotOverview: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_HISTORICAL_GRAPH_DATA:
            return {
                ...state,
                historicalData:[...state.historicalData, ...action.payload]
            }
        case GET_POT_GRAPH_DATA:
            return {
                ...state,
                graphData:[...state.graphData, ...action.payload]
            }
        case GET_POT_RUN_OVERVIEW:
            return {
                ...state,
                serverPotOverview:action.payload
            }
        default:
            return state;
    }
}
