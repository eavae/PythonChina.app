import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native'

const styles = StyleSheet.create({
  wrap: {
    height: 100,
    backgroundColor: '#fff',
    marginTop: 10
  }
})

/**
 * 话题卡片组件，根据数据渲染，是否需要显示节点标签
 */
export default class TopicCard extends Component {

  constructor(props, ctx) {
    super(props, ctx)
  }

  render() {
    const data = this.props.data

    return (
      <View style={styles.wrap}>
        <Text>row</Text>
      </View>
    )
  }
}