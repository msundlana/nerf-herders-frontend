import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchGraph = () => (dispatch) => {
    dispatch(graphLoading(true));

    return fetch(baseUrl + 'nerf-herders')
        .then(response => {
            if(response.ok){
                return response;
            }else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(graph => dispatch(addGraph(graph)))
        .catch(error => dispatch(graphFailed(error.message)));
};

export const graphLoading = () => ({
    type: ActionTypes.GRAPH_LOADING
});

export const graphFailed = (errmess) => ({
    type: ActionTypes.GRAPH_FAILED,
    payload: errmess
});

export const addGraph = (graph) => ({
    type: ActionTypes.ADD_GRAPH,
    payload: graph
});