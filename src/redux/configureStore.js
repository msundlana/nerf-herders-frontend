import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Graph } from "./graph";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            graph: Graph
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
};