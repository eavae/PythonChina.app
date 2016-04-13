import {camelizeKeys} from 'humps'
import {Buffer} from 'buffer/'

import {LOGIN_URL} from '../configs/url'
import {
  INVALIDATE_AUTH,
  REQUEST_LOGIN,
  RECEIVE_LOGIN_SUCCESS,
  RECEIVE_LOGIN_FAIL
} from './actionTypes'

export function invalidateAuth() {
  return {
    type: INVALIDATE_AUTH
  }
}

export function requestLogin() {
  return {
    type: REQUEST_LOGIN
  }
}

// {"avatar_url": null, "created_at": "2016-03-29T09:23:11Z", "description": null, "id": 2442, "is_active": true, "label": null, "name": null, "reputation": 0, "updated_at": "2016-03-29T09:23:11Z", "username": "fisher"}
export function receiveLoginSuccess(json) {
  return {
    type: RECEIVE_LOGIN_SUCCESS,
    receiveAt: Date.now(),
    data: json
  }
}

// {"error_code": "login_failed", "error_description": "Invalid username or password.", "status": "error"}
export function receiveLoginFail(json) {
  return {
    type: RECEIVE_LOGIN_FAIL,
    receiveAt: Date.now(),
    data: json
  }
}

export function shouldFetchLogin(state) {
  let {auth} = state
  if (!auth) {
    return true
  }
  else if (!auth.user) {
    return true
  }
  else if (auth.isFetching) {
    return false
  }
  else {
    return auth.didInvalidate
  }
}

export function fetchLoginIfNeeded(username, password) {
  return (dispatch, getState) => {
    if (shouldFetchLogin(getState())) {
      return dispatch(fetchLogin(username, password))
    }
    else {
      return Promise.resolve()
    }
  }
}

export function fetchLogin(username, password) {
  return (dispatch) => {
    dispatch(requestLogin())

    const url = LOGIN_URL
    const buf = new Buffer(`${username}:${password}`)

    return fetch(url, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Basic ' + buf.toString('base64'),
      },
      body: JSON.stringify({permanent:true}),
      credentials: 'same-origin'
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(json => {
      json = camelizeKeys(json)

      if (json.errorCode || json.error) {
        dispatch(receiveLoginFail(json))
      }
      else {
        dispatch(receiveLoginSuccess(json))
      }
    })
    .catch(e => console.log(e))
  }
}
