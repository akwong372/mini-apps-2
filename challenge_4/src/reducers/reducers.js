import { ACTION_TESTER } from "../actions/actions";

const initialState = {
  board: [],
  mines: [],
  test: ''
}

const mineSweeperApp = (state = initialState, action) => {
  if (action.type === ACTION_TESTER) {
    return Object.assign({}, state, {
      test: action.test
    });
  } else {
    return state;
  }
}

export default mineSweeperApp;