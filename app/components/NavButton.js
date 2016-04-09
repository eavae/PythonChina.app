import React, {
  StyleSheet,
  Component,
  PropTypes
} from 'react-native'

import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/Entypo'

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
  wrapLeft: {
    marginLeft: 6,
    paddingRight: 20
  },
  wrapRight: {
    marginRight: 6,
    paddingLeft: 20,
    justifyContent: 'flex-end'
  },
  icon: {
  }
})

/**
 * 导航栏按钮组件
 */
export default class NavButton extends Component {

  render() {
    const nameMap = {
      edit: 'feather',
      back: 'chevron-left',
      close: 'cross'
    }
    let wrapStyle = [styles.wrap]
    wrapStyle.push(this.props.position === 'left' ? styles.wrapLeft : styles.wrapRight)

    let name = nameMap[this.props.name]
    return (
      <Button containerStyle={wrapStyle}>
        <Icon name={name} size={28} color="#0076FF" style={styles.icon} />
      </Button>
    )
  }

  static propTypes = {
    position: PropTypes.oneOf(['left', 'right']),
    name: PropTypes.oneOf(['edit', 'back', 'close'])
  }
}
