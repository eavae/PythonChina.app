import {
  INVALIDATE_CAFES,
  REQUEST_CAFES,
  RECEIVE_CAFES_SUCCESS,
  RECEIVE_CAFES_FAIL
} from '../actions/actionTypes'

// const initialState = {
//   isFetching: false,
//   didInvalidate: false,
//   cursor: 0,
//   following: [],
//   unfollowing: []
// }

export default function cafes (state = {
  isFetching: false,
  didInvalidate: true,
  cursor: 0,
  following: [],
  unfollowing: []
}, action) {
  switch (action.type) {
    case INVALIDATE_CAFES:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_CAFES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_CAFES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        following: action.following,
        unfollowing: action.unfollowing,
        cursor: action.cursor
      }
    case RECEIVE_CAFES_FAIL:
      return state
    default:
      return state
  }
}
