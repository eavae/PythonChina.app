import {camelizeKeys} from 'humps'

import {TIMELINE_URL} from '../configs/url'
import {
  SWITCH_TIMELINE_SEGMENT,
  INVALIDATE_TIMELINE,
  REQUEST_TIMELINE,
  RECEIVE_TIMELINE,
  REQUEST_MORE_TIMELINE,
  RECEIVE_MORE_TIMELINE,
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
    items: json.data,
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

    let url = TIMELINE_URL
    let searchParams = new URLSearchParams()
    if (segment === TimelineSegments.ALL) {
      searchParams.append('show', 'all')
    }

    return fetch(url + '?' + searchParams)
      .then(response => response.json())
      .then(json => {
        json = camelizeKeys(json)

        // 派发接收到的数据
        dispatch(receiveTimeline(segment, json))
      })
  }
}

/**
 * 请求更多的时光轴话题
 * @param  {enum} segment 分类
 * @return {[type]}         [description]
 */
export function requestMoreTimeline(segment) {
  return {
    type: REQUEST_MORE_TIMELINE,
    segment
  }
}

/**
 * 是否应该获取更多的时光轴话题
 * @param  {[type]} segment [description]
 * @return {[type]}         [description]
 */
export function shouldFetchMoreTimeline(state, segment) {
  const topics = state.timeline[segment]
  // 如果cursor存在并大于0，并且没有在获取中，则可以获取
  if (topics && topics.cursor && !topics.isFetching) {
    return true
  }
  else {
    return false
  }
}

export function fetchMoreTimelineIfNeeded(segment) {
  return (dispatch, getState) => {
    if (shouldFetchMoreTimeline(getState(), segment)) {
      return dispatch(fetchMoreTimeline(segment))
    }
    else {
      return Promise.resolve()
    }
  }
}

export function fetchMoreTimeline(segment) {
  return (dispatch, getState) => {
    dispatch(requestMoreTimeline(segment))

    const topics = getState().timeline[segment]

    let url = TIMELINE_URL
    let searchParams = new URLSearchParams()
    if (segment === TimelineSegments.ALL) {
      searchParams.append('show', 'all')
    }
    searchParams.append('cursor', topics.cursor)

    return fetch(url + '?' + searchParams)
      .then(response => response.json())
      .then(json => {
        json = camelizeKeys(json)

        dispatch(receiveMoreTimeline(segment, json))
      })
  }
}

export function receiveMoreTimeline(segment, json) {
  return {
    type: RECEIVE_MORE_TIMELINE,
    segment,
    items: json.data,
    receivedAt: Date.now(),
    cursor: json.cursor
  }
}
