import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import RankingReducer from './RankingReducer';
export default combineReducers({
  user:authReducer,
  RankingReducer
});
