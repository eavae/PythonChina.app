import {combineReducers} from 'redux'

import {
  INVALIDATE_AUTH,
  REQUEST_LOGIN,
  RECEIVE_LOGIN_SUCCESS,
  RECEIVE_LOGIN_FAIL
} from '../actions/actionTypes'

// const initialState = {
//   isFetching: true,
//   didInvalidate: false,
//   user: {
//     avatarUrl: '',
//     createAt: '',
//     description: '',
//     id: 123,
//     isActive: true,
//     label: null,
//     name: null,
//     reputation: 0,
//     updatedAt: '',
//     uaername: 'li'
//   },
//   error: {
//     code: 'login_failed',
//     description: '',
//     status: 'error'
//   }
// }

export default function auth(state = {
  isFetching: false,
  didInvalidate: true,
  user: {},
  error: {}
}, action) {
  switch(action.type) {
    case INVALIDATE_AUTH:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_LOGIN:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthed: true,
        isFetching: false,
        didInvalidate: false,
        user: action.data,
        lastUpdated: action.receivedAt
      }
    case RECEIVE_LOGIN_FAIL:
      return {
        ...state,
        isAuthed: false,
        isFetching: false,
        didInvalidate: true,
        user: null,
        error: action.data,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}
