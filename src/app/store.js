
import { createStore, combineReducers } from "redux";
import { nluReducer } from "./reducers/NluReducer";
import { stateReducer } from "./reducers/StateReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
    nlu: nluReducer,
    state: stateReducer
  })

export default createStore(reducer, composeWithDevTools());
