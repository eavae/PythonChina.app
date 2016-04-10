import React, {
  StyleSheet,
  Component,
  View,
  Image,
  Text
} from 'react-native'

const styles = StyleSheet.create({
  image: {

  },
  wrap: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 24
  }
})

/**
 * 用户头像组件，需要支持点击，头像地址，样式
 */
export default class UserAvatar extends Component {

  constructor(props, ctx) {
    super(props, ctx)
  }

  render() {
    if (this.props.url) {
      return this.renderRoundImage()
    }
    else {
      return this.renderDefaultImage()
    }
  }

  renderRoundImage() {
    let uri = 'http:' + this.props.url
    return (
      <Image
        source={{uri: uri}}
        style={[this.props.style, {width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2}]}
      />
    )
  }

  renderDefaultImage() {

    return (
      <View style={[styles.wrap, {width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2}]}>
        <Text style={[styles.text]}>{this.props.username[0].toUpperCase() || 'P'}</Text>
      </View>
    )
  }
}