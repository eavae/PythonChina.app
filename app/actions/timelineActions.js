import {camelizeKeys} from 'humps'

import {TIMELINE_FAVORITE_URL, TIMELINE_ALL_URL} from '../configs/url'
import {
  SWITCH_TIMELINE_SEGMENT,
  INVALIDATE_TIMELINE,
  REQUEST_TIMELINE,
  RECEIVE_TIMELINE,
  TimelineSegments
} from './actionTypes'

/**
 * 切换时光轴标签
 * @param  {enum} segment 标签
 * @return {object}
 */
export function switchSegment(segment) {
  return {
    type: SWITCH_TIMELINE_SEGMENT,
    segment
  }
}

export function invalidateTimeline(segment) {
  return {
    type: INVALIDATE_TIMELINE,
    segment
  }
}

export function requestTimeline(segment) {
  return {
    type: REQUEST_TIMELINE,
    segment
  }
}

export function receiveTimeline(segment, json) {
  return {
    type: RECEIVE_TIMELINE,
    segment,
    topics: json.data,
    receivedAt: Date.now(),
    cursor: json.cursor
  }
}

export function shouldFetchTimeline(state, segment) {
  const topics = state.timeline[segment]
  if (!topics) {
    return true
  }
  else if (topics.isFetching) {
    return false
  }
  else {
    return topics.didInvalidate
  }
}

export function fetchTimelineIfNeeded(segment) {
  return (dispatch, getState) => {
    if (shouldFetchTimeline(getState(), segment)) {
      return dispatch(fetchTimeline(segment))
    }
    else {
      return Promise.resolve()
    }
  }
}

export function fetchTimeline(segment) {
  return (dispatch) => {
    dispatch(requestTimeline(segment))

    let url
    if (segment === TimelineSegments.FAVORITE) {
      url = TIMELINE_FAVORITE_URL
    }
    else {
      url = TIMELINE_ALL_URL
    }

    return fetch(url)
      .then(response => response.json())
      .then(json => {
        json = camelizeKeys(json)

        // 派发接收到的数据
        dispatch(receiveTimeline(segment, json))
      })
  }
}
