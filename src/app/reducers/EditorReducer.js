const initialState = { id: '', name: '', text: '' };

export function editorReducer(state = initialState, action) {
  switch (action.type) {
    /*
    case "DATOS":
      return {
        ...state,
        payload: action.payload
      };
    */
    case "DATA":
      return {
        id: action.payload._id,
        name: action.payload.name,
        text: action.payload.text
      };

    case "ID":
      return {
        ...state,
        id: action.newId
      };

    case "NAME":
      return {
        ...state,
        name: action.newName
      };

    case "TEXT":
      return {
        ...state,
        text: action.newText
      };

    default:
      return state;
  }
}
