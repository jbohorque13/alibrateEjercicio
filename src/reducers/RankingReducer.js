import {
  SAVE_RANKING_REVIEWERS,
  SAVE_RANKING_READERS
} from '../actions/ActionTypes';

const INITIAL_STATE = {
    readers:null,
    reviewers:null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_RANKING_REVIEWERS:
      console.log('action.payload ', action.payload.reviewers);
      return { ...state, reviewers: action.payload.reviewers };
    case SAVE_RANKING_READERS:
        console.log('action.payload ', action.payload.readers);
        return { ...state, readers: action.payload.readers };
  }
  return state;
};
