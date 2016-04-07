import React, {
  Component,
  ListView,
  StyleSheet,
  RefreshControl,
  View,
  Text
} from 'react-native'

import TopicCard from './TopicCard'

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    backgroundColor: '#eee'
  }
})

/**
 * 话题列表组件
 */
export default class TopicList extends Component {
  constructor(props, ctx) {
    super(props, ctx)

    this.state = {
      isRefreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (a, b) => a !== b
      }),
      cursor: null
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (this.state.cursor) {
      return (
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.fetchData()}
              tintColor="#0076FF"
              title="加载中..."
              colors={['#ff0000', '#00ff00', '#0000ff']}
            />
          }
        />
      )
    }
    // 这里应该显示一个正在加载中的页面
    return (
      <View>
        <Text>
          加载中
        </Text>
      </View>
    )
  }

  fetchData() {
    this.setState({
      isRefreshing: true
    })
    let url = this.props.url
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => res.json()
    ).then(res => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res.data),
        cursor: res.cursor,
        isRefreshing: false
      })
    }).catch(e => console.log(e))
  }

  renderRow(topic) {
    console.log(topic)
    return (
      <TopicCard data={topic}/>
    )
  }
}