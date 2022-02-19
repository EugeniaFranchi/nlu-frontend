const initialState = { state: 'Neutral' };

export function stateReducer(state = initialState, action) {
  switch (action.type) {
    case "STATE":
      return {
        state: action.newState
      };

    default:
      return state;
  }
}
