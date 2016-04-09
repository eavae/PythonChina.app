'use strict';
import React, {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  RefreshControl,
  TabBarIOS,
} from 'react-native'

import {connect} from 'react-redux'

import {TIMELINE_ALL_URL} from '../configs/url'
import {TimelineSegments} from '../actions/actionTypes'

import {
  fetchTimelineIfNeeded,
  switchSegment,
  invalidateTimeline} from '../actions/timelineActions'
import NavBar from '../components/NavBar'
import TopicCard from '../components/TopicCard'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    bottom: 0
  }
})

class Timeline extends Component{
  constructor(props, ctx) {
    super(props, ctx)

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (a, b) => a !== b
      })
    }
  }

  componentDidMount() {
    const {dispatch, segment} = this.props
    dispatch(fetchTimelineIfNeeded(segment))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.segment !== this.props.segment) {
      const {dispatch, segment} = nextProps
      dispatch(fetchTimelineIfNeeded(segment))
    }
    if (nextProps.topics && nextProps.topics !== this.props.topics) {
      const {items} = nextProps.topics
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      })
    }
  }

  onRefresh() {
    const {dispatch, segment} = this.props
    dispatch(invalidateTimeline(segment))
    dispatch(fetchTimelineIfNeeded(segment))
  }

  render () {
    let {topics} = this.props
    let child
    if (topics && topics.cursor) {
      child = (
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          refreshControl={
            <RefreshControl
              refreshing={topics.isFetching}
              onRefresh={() => this.onRefresh()}
              tintColor="#0076FF"
              title="加载中..."
              colors={['#ff0000', '#00ff00', '#0000ff']}
            />
          }
        />
      )
    }
    else {
      child = (
        <View>
          <Text>
            加载中
          </Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
      {child}
      </View>
    )
  }

  renderRow(topic) {
    return (
      <TopicCard data={topic}/>
    )
  }
}

export default connect(state => ({
  topics: state.timeline[state.segment],
  segment: state.segment
}))(Timeline)
