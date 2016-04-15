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
import {Actions} from 'react-native-router-flux'

import {TimelineSegments} from '../actions/actionTypes'

import {
  fetchTimelineIfNeeded,
  fetchMoreTimelineIfNeeded,
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
    bottom: 0,

    backgroundColor: '#eee'
  },
  listView: {
    flex: 1
  },
  footer: {
    height: 37,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#666',
    fontSize: 13
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
    // setTimeout(() => Actions.login(), 2000)
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

  onEndReached() {
    const {dispatch, segment} = this.props
    dispatch(fetchMoreTimelineIfNeeded(segment))
  }

  render () {
    let {topics} = this.props
    let child
    if (topics && topics.items && topics.items.length > 0) {
      child = (
        <ListView
          onEndReachedThreshold={100}
          onEndReached={() => this.onEndReached()}
          contentInset={{bottom:50}}
          automaticallyAdjustContentInsets={false}
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderFooter={() => this.renderFooter()}
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

  renderFooter() {
    let {topics} = this.props
    let text = topics.cursor ? '正在加载更多内容...' : '已浏览完所有话题'
    return (
      <View style={styles.footer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    )
  }
}

// export default connent(state => {
//   console.log(state)
//   return {
//     topics: state.timeline.timeline[]
//   }
// })

export default connect(state => ({
  topics: state.timeline.timeline[state.timeline.segment],
  segment: state.timeline.segment
}))(Timeline)
