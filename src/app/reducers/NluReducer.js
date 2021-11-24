const initialState = { id: '', name: '', text: '' };

export function nluReducer(state = initialState, action) {
  switch (action.type) {
    case "DATA":
      return {
        id: action.payload.id,
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
