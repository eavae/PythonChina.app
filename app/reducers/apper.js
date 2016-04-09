import {createStore} from 'redux'

import * from '../actions/actionTypes'

const initialState = {
  tab: Tabs.HOME
}

export default function apper (state = initialState, actions = {}) {
  switch (action.type) {
    case SWITCH_TAB:
      return {
        ...state,
        tab: action.tab
      }
    default:
      return state
  }
}
