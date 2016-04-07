import React, {
  StyleSheet,
  Component,
  View,
  Image
} from 'react-native'

const styles = StyleSheet.create({
  image: {

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
    let uri = 'http:' + this.props.url
    return (
      <Image
        source={{uri: uri}}
        style={[this.props.style, {width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2}]}
      />
    )
  }
}