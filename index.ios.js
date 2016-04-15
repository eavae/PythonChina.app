import React, {
  View,
  Text,
  NavigatorIOS,
  AppRegistry,
  createClass,
  StyleSheet
} from 'react-native'

import {Actions, Scene, Router, Modal} from 'react-native-router-flux'
import {Provider, connect} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'

import Timeline from './app/containers/Timeline'
import CafeList from './app/containers/CafeList'
import Me from './app/containers/Me'
import Login from './app/containers/Login'
import TabIcon from './app/components/TabIcon'
import NavBar from './app/components/NavBar'
import {fetchTimeline, switchSegment, fetchTimelineIfNeeded} from './app/actions/timelineActions'
import {TimelineSegments} from './app/actions/actionTypes'
import rootReducer from './app/reducers'

const styles = StyleSheet.create({
  tab: {
    borderTopWidth: .5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    opacity: .98
  }
})

const loggerMiddleware = createLogger()
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)
const store = createStoreWithMiddleware(rootReducer)

              // <Scene
              //   title="我的关注"
              //   key="timeline-favorite"
              //   component={connect(state => ({topics: state.timeline[TimelineSegments.FAVORITE]}))(Timeline)}
              //   navBar={connect(state => ({segment: state.segment}))(NavBar)}
              //   segmentValues={['我的关注', '所有话题']}
              //   />
              // <Scene
              //   title="所有话题"
              //   key="timeline-all"
              //   component={connect(state => ({topics: state.timeline[TimelineSegments.ALL]}))(Timeline)}
              //   navBar={connect(state => ({segment: state.segment}))(NavBar)}
              //   segmentValues={['我的关注', '所有话题']}
              //   />

class App extends React.Component {

  render () {
    return (
      <Provider store={store}>
        <Router>
          <Scene
            key="root"
            hideNavBar={true}
          >
            <Scene key="home" tabs={true} default="discover" style={styles.tab}
              initial={true}>
              <Scene
                title="首页"
                navBar={connect(state => ({segment: state.timeline.segment}))(NavBar)}
                segmentValues={['我的关注', '所有话题']}
                component={Timeline}
                key="timeline"
                icon={TabIcon}
                />
              <Scene
                initial={true}
                key="discover"
                title="发现"
                navBar={NavBar}
                icon={TabIcon}
                component={CafeList} />
              <Scene
                key="me"
                title="我的"
                navBar={NavBar}
                icon={TabIcon}
                component={Me} />
            </Scene>
            <Scene
              key="login"
              title="登录"
              component={Login}
              navBar={NavBar}
              direction="vertical"
              close={Actions.pop}
            />
          </Scene>
        </Router>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('PythonChina', () => App)
