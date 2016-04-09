import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  item: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginLeft: 8
  },
  text: {
    fontSize: 13,
    color: '#666'
  },
  icon: {
    marginRight: 2
  }
})

/**
 * UGC内容统计数据组件, view查看数，comment评论数，like喜欢数，topicId话题ID
 */
export default class TopicUGCBrief extends Component {

  constructor(props, ctx) {
    super(props, ctx)
  }

  render() {
    const iconSize = 13
    const iconColor = '#666'

    return (
      <View style={[styles.wrap, this.props.style]}>
        <View style={styles.item}>
          <Icon name="eye" size={iconSize} color={iconColor} style={[styles.icon, {paddingTop: 1}]}/>
          <Text style={styles.text}>{this.props.viewCount}</Text>
        </View>
        <View style={styles.item}>
          <Icon name="comments-o" size={iconSize} color={iconColor} style={[styles.icon]}/>
          <Text style={styles.text}>{this.props.commentCount}</Text>
        </View>
        <View style={styles.item}>
          <Icon name="heart-o" size={iconSize} color={iconColor} style={[styles.icon, {paddingTop: 1}]}/>
          <Text style={styles.text}>{this.props.likeCount}</Text>
        </View>
      </View>
    )
  }
}
