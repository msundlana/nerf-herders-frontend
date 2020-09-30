import * as ActionTypes from './ActionTypes';

export const Graph = (state= {
    isLoading: true,
    errMess: null,
    graph: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_GRAPH:
            return {...state, isLoading: false, errMess:null, graph: action.payload};
        case ActionTypes.GRAPH_LOADING:
            return {...state, isLoading: true, errMess:null, graph: []};
        case ActionTypes.GRAPH_FAILED:
            return {...state, isLoading: false, errMess:action.payload, graph: []};
        default:
            return state;
    }
}