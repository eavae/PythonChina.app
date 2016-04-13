import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native'

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#fff',
    height: 100
  }
})

export default class CafeCard extends Component {

  constructor(props, ctx) {
    super(props, ctx)
  }

  render() {
    let {name, cafes} = this.props

    return (
      <View style={[styles.block, this.props.style]}>
      </View>
    )
  }

}
