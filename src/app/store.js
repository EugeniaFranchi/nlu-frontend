import { createStore, combineReducers } from "redux";
import { editorReducer } from "./reducers/EditorReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
    editor: editorReducer
  })

export default createStore(reducer, composeWithDevTools());
