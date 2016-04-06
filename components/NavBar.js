import React, {
  StyleSheet,
  Component,
  PropTypes
} from 'react-native'

import NavigationBar from 'react-native-navbar'
import NavButton from './NavButton'

const styles = StyleSheet.create({
  nav: {
    borderBottomWidth: .5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    opacity: .98
  }
})

/**
 * 导航栏组件 有无返回，有无关闭，有无编辑，有无返回
 */
export default class NavBar extends Component {

  render() {
    let hasClose = !!this.props.close;
    let hasEdit = !!this.props.edit;
    let hasBack = !!this.props.back;

    // 有关闭按钮时，其它均不显示
    if (hasClose) {
      hasBack = false;
      hasEdit = false;
    }

    // 有编辑按钮时，不能有关闭按钮
    if (hasEdit) {
      hasClose = false;
    }

    let buttons = {}
    if (hasBack) {
      buttons.leftButton = <NavButton name="back" position="left"/>
    }
    if (hasClose || hasEdit) {
      buttons.rightButton = <NavButton name={hasClose ? 'close' : 'edit'} position="right"/>
    }

    return (
      <NavigationBar
        title={{title: this.props.title, tintColor: '#030303'}}
        style={styles.nav}
        {...buttons}
      />
    )
  }

  static propTypes = {
    close: PropTypes.func,
    back: PropTypes.func,
    edit: PropTypes.func
  }
}