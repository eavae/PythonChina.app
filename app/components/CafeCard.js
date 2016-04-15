import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Image
} from 'react-native'

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#fff'
  },
  header: {
    borderColor: '#ccc',
    borderBottomWidth: .5
  },
  title: {
    fontSize: 13,
    paddingTop: 6,
    paddingBottom: 6,
    marginLeft: 10
  },
  listItem: {
    paddingBottom: 5,
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 10,

    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  listItemBorder: {
    borderColor: '#ccc',
    borderTopWidth: .5
  },
  listItemImageWrap: {

  },
  listItemContent: {
    flex: 1,
    height: 64,
    marginLeft: 10,

    flexDirection: 'column',
    flexWrap: 'nowrap'
  },
  imageSize: {
    width: 88,
    height: 64
  },
  listItemHeader: {
    color: '#333',
    fontSize: 18
  },
  listItemText: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20
  }
})

// class CafeCardItem extends Component {
//   render() {
//     return (
//       <View>

//       </View>
//     )
//   }
// }

export default class CafeCard extends Component {

  constructor(props, ctx) {
    super(props, ctx)
  }

  render() {
    let {title, cafes} = this.props

    return (
      <View style={[styles.block, this.props.style]}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.listWrap}>
        {
          cafes.map((cafe, index) => {
            let ss = [styles.listItem]
            if (index !== 0) {
              ss.push(styles.listItemBorder)
            }
            return (
              <View key={cafe.id} style={ss}>
                <View style={styles.imageSize}>
                {this.renderItemImage(cafe.style)}
                </View>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemHeader} numberOfLines={1}>{cafe.name}</Text>
                  <Text style={styles.listItemText} numberOfLines={2}>{cafe.description}</Text>
                </View>
              </View>
            )
          })
        }
        </View>
      </View>
    )
  }

  renderItemImage(style) {
    if (style.cover) {
      return (
        <Image source={{uri: style.cover}} style={styles.imageSize} />
      )
    }
    else {
      return (
        <View style={[{backgroundColor: style.color || '#D8D8D8', flex: 1}]}/>
      )
    }
  }

}
