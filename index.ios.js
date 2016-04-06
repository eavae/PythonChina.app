import React, {
  View,
  Text,
  NavigatorIOS,
  AppRegistry,
  createClass,
  StyleSheet
} from 'react-native'

import {Actions, Scene, Router} from 'react-native-router-flux'

import Timeline from './views/Timeline'
import Login from './components/Login'
import TabIcon from './components/TabIcon'
import NavBar from './components/NavBar'
import Cafe from './views/Cafe'
import Me from './views/Me'

const styles = StyleSheet.create({
  tab: {
    borderTopWidth: .5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    opacity: .98
  }
})

class App extends React.Component {
  _closeClick () {
    console.log('close click');
  }

  render () {
    return (
      <Router>
        <Scene key="home" tabs={true} default="topic" style={styles.tab}>
          <Scene
            segmentValues={['我的关注', '所有话题']}
            key="topic"
            title="首页"
            icon={TabIcon}
            component={Timeline}
            titleStyle={{color:'white'}}
            initial={true}
            navBar={NavBar} />
          <Scene key="discover"
            title="发现"
            navBar={NavBar}
            icon={TabIcon}
            component={Cafe} />
          <Scene
            key="me"
            title="我的"
            navBar={NavBar}
            icon={TabIcon}
            component={Me} />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('PythonChina', () => App)
