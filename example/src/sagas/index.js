import { all, call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import fetch from '../utils/fetch';
const assign = Object.assign;

import {
  FETCH_DATA,
  fetchDataSuccess,
} from '../actions';


/**
 * 请求数据
 */
function* fetchData({ payload = {} }) {
  try {
    const res = yield call(fetch, {
      url: 'https://api.github.com/users',
    });

    if (res) {
      yield put(fetchDataSuccess(res));
    }
  } catch (e) {
    alert(`获取数据出错，${e}`);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_DATA, fetchData),
  ]);
}
