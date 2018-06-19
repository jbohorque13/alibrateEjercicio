import {
  SAVE_USER
} from '../actions/ActionTypes';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_USER:
      console.log('action.payload ', action.payload);
      return Object.assign({}, state, [...state, action.payload]);
  }
  return state;
};
