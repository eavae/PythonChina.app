import {camelizeKeys} from 'humps'
import {stringify} from 'query-string'

import {CAFES_URL} from '../configs/url'
import {
  INVALIDATE_CAFES,
  REQUEST_CAFES,
  RECEIVE_CAFES_SUCCESS,
  RECEIVE_CAFES_FAIL
} from './actionTypes'

export function invalidateCafes() {
  return {
    type: INVALIDATE_CAFE
  }
}

export function requestCafes() {
  return {
    type: REQUEST_CAFES
  }
}

export function receiveCafesSuccess(json) {
  return {
    type: RECEIVE_CAFES_SUCCESS,
    unfollowing: json.data || [],
    following: json.following || [],
    cursor: json.cursor,
    receiveAt: Date.now()
  }
}

// TODO
export function receiveCafesFail(json) {

}

export function shouldFetchCafes(state) {
  let {cafes} = state
  if (!cafes) {
    return true
  }
  else if (cafes.isFetching) {
    return false
  }
  else {
    return cafes.didInvalidate
  }
}

export function fetchCafesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCafes(getState())) {
      return dispatch(fetchCafes())
    }
    else {
      return Promise.resolve()
    }
  }
}

export function fetchCafes() {
  return (dispatch) => {
    dispatch(requestCafes())
    
    const url = CAFES_URL
    let params = {
      count: 1000
    }

    return fetch(url + '?' + stringify(params), {
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => {
      data = camelizeKeys(data)

      dispatch(receiveCafesSuccess(data))
    })
  }
}
