import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native'

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

export default class Cafe extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CafeCard style={styles.card}/>
        <CafeCard style={styles.card}/>
      </View>
    )
  }
}
