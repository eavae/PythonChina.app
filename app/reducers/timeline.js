import {createStore} from 'redux'
import {combineReducers} from 'redux'

import {
  TimelineSegments,
  SWITCH_TIMELINE_SEGMENT,
  INVALIDATE_TIMELINE,
  REQUEST_TIMELINE,
  REQUEST_MORE_TIMELINE,
  RECEIVE_TIMELINE,
  RECEIVE_MORE_TIMELINE
} from '../actions/actionTypes'

// const initialState = {
//   segment: TimelineSegments.ALL,
//   timeline: {
//     0: {
//       isFetching: true,
//       didInvalidate: false,
//       cusor: 0,
//       items: []
//     },
//     1: {
//       isFetching: false,
//       didInvalidate: false,
//       items: []
//     }
//   }
// }

function segment(state = TimelineSegments.ALL, action) {
  switch (action.type) {
    case SWITCH_TIMELINE_SEGMENT:
      return action.segment
    default:
      return state
  }
}

function topics(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  cursor: 0
}, action) {
  switch (action.type) {
    case INVALIDATE_TIMELINE:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_TIMELINE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_TIMELINE:
      return {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        lastUpdated: action.receivedAt,
        cursor: action.cursor
      }
    case REQUEST_MORE_TIMELINE:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_MORE_TIMELINE:
      return {
        isFetching: false,
        didInvalidate: false,
        items: [...state.items, ...action.items],
        lastUpdated: action.receivedAt,
        cursor: action.cursor
      }
    default:
      return state
  }
}

function timeline(state = {}, action) {
  switch(action.type) {
    case INVALIDATE_TIMELINE:
    case REQUEST_TIMELINE:
    case RECEIVE_TIMELINE:
    case REQUEST_MORE_TIMELINE:
    case RECEIVE_MORE_TIMELINE:
      return {
        ...state,
        [action.segment]: topics(state[action.segment], action)
      }
    default:
      return state
  }
}

export default combineReducers({
  segment,
  timeline
})



















