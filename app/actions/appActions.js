import * from './actionTypes'

export function switchTab(tab) {
  return {
    type: SWITCH_TAB,
    tab
  }
}
