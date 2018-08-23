import { createAction } from 'redux-actions';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';

export const fetchData = createAction(FETCH_DATA);
export const fetchDataSuccess = createAction(FETCH_DATA_SUCCESS);
