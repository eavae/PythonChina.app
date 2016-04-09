import {createStore} from 'redux'

import * from '../actions/actionTypes'

const initialState = {
  segment: TimelineSegments.FAVORITE,
  all: {
    cursor: 0,
    topics: []
  },
  favorite: {
    cursor: 0,
    topics: []
  }
}

export default function timeliner (state = initialState, action = {}) {
  switch (action.type) {
    case SWITCH_TIMELINE_SEGMENT:
      return {
        ...state,
        segment: action.segment
      }
    default:
      return state
  }
}
