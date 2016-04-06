'use strict';
import React, {
  AppRegistry,
  createClass,
  StyleSheet,
  Text,
  ListView,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  RefreshControl,
  TabBarIOS,
} from 'react-native';

import { TIMELINE_URL, HOME_URL, DEFAULT_AVATAR } from '../config'
import Topic from './Topic'
import Login from '../components/Login'
import NavBar from '../components/NavBar'

var Timeline = createClass({
  getInitialState () {
    return {
      isRefreshing: false,
      data: new ListView.DataSource({
        rowHasChanged (row1, row2) {return row1 !== row2}
      }),
      selectedTab: 'all',
      cursor: null
    }
  },
  render () {
    return this._renderHome()
  },
  _renderList (tab) {
    var fetcher
    if (tab === 'all') {
      fetcher = this._fetchAllData
    } else if (tab === 'home') {
      fetcher = this._fetchHomeData
    }
    return (
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        <NavBar title="首页" segmentValues={['我的关注', '所有话题']}/>
        {
          this.state.cursor &&
          <ListView
            showsVerticalScrollIndicator={false}
            style={styles.listView}
            dataSource={this.state.data}
            renderRow={this.renderTopic}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._fetchAllData}
                tintColor="#ff0000"
                title="Loading..."
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
                />
            }
          /> || this.renderLoadingView()
        }
      </View>
    );
  },
  _renderAll () {
    return this._renderList('all')
  },
  _renderHome () {
    return this._renderList('home')
  },
  componentDidMount () {
    this._fetchData(TIMELINE_URL);
  },
  _renderLogin () {
    return (
      <Login />
    )
  },
  renderLoadingView () {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading ....</Text>
      </View>
    )
  },
  renderTopic (topic) {
    return (
      <TouchableHighlight onDelayColor='#dddddd'
          onPress={() => this.jumpToTopic(topic.id)}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image style={styles.avatar}
              source={topic.user.avatar_url
                  && {uri: 'https:'+topic.user.avatar_url}
                  || DEFAULT_AVATAR} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{topic.title}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.name}>{topic.user.name || topic.user.username}</Text>
          <Text style={styles.bottom}>{topic.view_count} views</Text>
          <Text style={styles.bottom}>{topic.comment_count} replies</Text>
          <Text style={styles.bottom}>{topic.like_count} likes</Text>
          <Text style={styles.bottom}>{topic.created_at}</Text>
        </View>
      </View>
      </TouchableHighlight>
    )
  },
  _fetchData (apiUrl) {
    this.setState({isRefreshing: true});
    return fetch(apiUrl)
      .then(rsp => rsp.json())
      .then(data => {this._handelRsp(data);})
      .catch(
        error =>
          this.setState({
            isLoading: false,
            message: 'Something bad happened ' + error
          })
      )
      .then(() => {
        this.setState({
          isRefreshing: false
        });
      });
  },
  _fetchAllData () {
    return this._fetchData(TIMELINE_URL)
  },
  _fetchHomeData () {
    return this._fetchData(HOME_URL)
  },
  _handelRsp (rsp) {
    this.setState({
      data: this.state.data.cloneWithRows(rsp.data),
      cursor: true,
      isRefreshing: false
    });
  },
  jumpToTopic (id) {
    this.props.navigator.push({
      name: 'Topic page',
      component: Topic,
      passProps: {
        topicId: id
      }
    });
  }
})

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    fontSize: 36
  },
  mainContainer: {
    flex: 1,
    margin: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  rightContainer: {
    flex: 1
  },
  bottomContainer: {
    flex: 1,
    marginBottom: 12,
    flexDirection: 'row',
  },
  bottom: {
    color: '#777',
    fontSize: 14,
    marginRight: 4,
  },
  name: {
    color: '#555',
    fontSize: 14,
    marginRight: 4,
  },
  avatar: {
    width: 50,
    height: 50
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 10,
  },
  listView: {
    flex: 1,
    backgroundColor: '#f5fdfd'
  }
});

export default Timeline;
