import React, {
  StyleSheet,
  Component,
  View,
  Text,
  ScrollView
} from 'react-native'

import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'

import {
  fetchCafesIfNeeded,
  invalidateCafes
} from '../actions/cafesActions'
import CafeCard from '../components/CafeCard'

let styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: '#eee'
  },
  card: {
    marginTop: 10
  }
})

class CafeList extends Component {

  constructor(props, ctx) {
    super(props, ctx)
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(fetchCafesIfNeeded())
  }

  render() {
    let {isFetching, following, unfollowing} = this.props.cafes

    let child = []
    if (isFetching) {
      child = (
        <View>
          <Text>
            加载中
          </Text>
        </View>
      )
    }
    else {
      if (following.length > 0) {
        child.push(<CafeCard key="following" style={styles.card} cafes={following} title="已关注的节点"/>)
      }
      if (unfollowing.length > 0) {
        child.push(<CafeCard key="unfollowing" style={styles.card} cafes={unfollowing} title="未关注的节点"/>)
      }
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          {child}
        </ScrollView>
      </View>
    )
  }
}

export default connect(state => ({
  cafes: state.cafes
}))(CafeList)
