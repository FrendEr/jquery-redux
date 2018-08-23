import { handleActions } from 'redux-actions';
import {
  FETCH_DATA_SUCCESS,
} from '../actions';

const initialState = {
  userList: [],
};

const reducers = handleActions({
  [FETCH_DATA_SUCCESS]: (state, { payload }) => ({
    ...state,
    userList: [...payload]
  }),
}, initialState);

export default reducers;
