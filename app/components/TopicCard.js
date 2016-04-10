import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native'

import Button from 'react-native-button'

import UserAvatar from './UserAvatar'
import TopicUGCBrief from './TopicUGCBrief'
import moment from '../util/moment'

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    marginTop: 10
  },

  // 卡片头
  header: {
    height: 56,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ccc',
    borderBottomWidth: .5
  },
  headerLeft: {
    marginLeft: 10,
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },

  // 用户信息
  user: {
    height: 46,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  username: {
    fontSize: 16,
    color: '#333',
    lineHeight: 18
  },
  publishday: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18
  },
  publishText: {
    fontSize: 11,
    color: '#666',
    paddingTop: 1
  },

  // 发布节点
  nodeDivider: {
    borderRightColor: '#000',
    borderRightWidth: .8
  },
  nodeButton: {
    fontSize: 13,
    color: '#008EFF',
    paddingLeft: 5,
    paddingRight: 5,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'normal'
  },
  nodeContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginRight: 5
  },

  // 话题标题
  titleWrap: {
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: '#ccc',
    borderBottomWidth: .5
  },
  title: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18,
    color: '#000'
  },

  // 卡片尾巴
  footWrap: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10
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
    let createTime = moment(data.createdAt).fromNow()
    let nodes = (data.cafes || []).slice(0, 3)

    // 用于测试node节点多余1个的情况
    // let nodes = [{
    //   id: 22,
    //   name: 'Web 开发'
    // }, {
    //   id: 21,
    //   name: '水'
    // }]

    return (
      <View style={styles.wrap}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <UserAvatar
              url={data.user.avatarUrl}
              username={data.user.username}
              size={46}/>
            <View style={styles.user}>
              <Text style={styles.username}>{data.user.username}</Text>
              <Text style={styles.publishday}>{createTime}</Text>
            </View>
          </View>
          <View style={styles.nodeContainer}>
            <Text style={styles.publishText}>
              发布于
            </Text>
            {nodes.map((item, i) => {
              return (
                <View key={item.id} style={[i < nodes.length - 1 && styles.nodeDivider]}>
                  <Button style={[styles.nodeButton]}>
                    {item.name}
                  </Button>
                </View>
              )
            })}
          </View>
        </View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View style={styles.footWrap}>
          <TopicUGCBrief
            viewCount={data.readCount}
            commentCount={data.commentCount}
            likeCount={data.likeCount}
            topicId={data.id}
          />
        </View>
      </View>
    )
  }
}