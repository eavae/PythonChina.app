
/*
action 类型
 */
// Timeline
export const SWITCH_TIMELINE_SEGMENT = 'SWITCH_TIMELINE_SEGMENT'
export const INVALIDATE_TIMELINE = 'INVALIDATE_TIMELINE'
export const REQUEST_TIMELINE = 'REQUEST_TIMELINE'
export const RECEIVE_TIMELINE = 'RECEIVE_TIMELINE'
export const REQUEST_MORE_TIMELINE = 'REQUEST_MORE_TIMELINE'
export const RECEIVE_MORE_TIMELINE = 'RECEIVE_MORE_TIMELINE'

// 枚举常量
export const TimelineSegments = {
  FAVORITE: 0,
  ALL: 1
}

// 权限验证
export const INVALIDATE_AUTH = 'INVALIDATE_AUTH'
export const REQUEST_LOGIN = 'REQUEST_LOGIN_AUTH'
export const RECEIVE_LOGIN_SUCCESS = 'RECEIVE_LOGIN_SUCCESS'
export const RECEIVE_LOGIN_FAIL = 'RECEIVE_LOGIN_FAIL'

// CAFE相关
export const INVALIDATE_CAFES = 'INVALIDATE_CAFES'
export const REQUEST_CAFES = 'REQUEST_CAFES'
export const RECEIVE_CAFES_SUCCESS = 'RECEIVE_CAFES_SUCCESS'
export const RECEIVE_CAFES_FAIL = 'RECEIVE_CAFES_FAIL'
