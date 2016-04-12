import React, {
  StyleSheet,
  Component,
  View,
  Image,
  TextInput,
  Text
} from 'react-native'

import {connect} from 'react-redux'
import Button from 'react-native-button'
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';

import {
  fetchLoginIfNeeded,
  invalidateAuth
} from '../actions/authActions'

let styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: '#fff'
  },
  banner: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#50E3C2'
  },
  icon: {
    width: 100,
    height: 100
  },
  formWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30
  },
  inputWrap: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    height: 30,
    marginTop: 30
  },
  errmsg: {
    marginTop: 30,
    color: 'red',
    fontSize: 15,
    opacity: 0
  },
  btnWrap: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,

    borderColor: '#000',
    borderWidth: .5,
    borderRadius: 5,
  },
  btn: {
    color: '#000',
    fontSize: 17,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'normal',
  },
  btnWrapDisabled: {
    borderColor: '#ccc'
  },
  btnDisabled: {
    color: '#ccc'
  },
  show: {
    opacity: 1
  }
})

class Login extends Component {

  constructor(props, ctx) {
    super(props, ctx)

    this.state = {
      username: '',
      password: '',
      errmsg: '',
      loading: false
    }
  }

  login() {
    let {username, password} = this.state
    if (!username) {
      return this.setState({
        errmsg: '请输入用户名或邮箱帐号'
      })
    }
    else if (!password) {
      return this.setState({
        errmsg: '请输入密码'
      })
    }
    else if (username.indexOf('@') !== -1) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(username)) {
        return this.setState({
          errmsg: '邮箱帐号错误，请仔细检查'
        })
      }
    }
    else {
      let re = /^[a-zA-Z0-9]+$/
      if (!re.test(username)) {
        return this.setState({
          errmsg: '用户名错误，请仔细检查'
        })
      }
    }

    // 提交服务端验证
    const {dispatch} = this.props
    dispatch(fetchLoginIfNeeded(username, password))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.error.errorDescription !== this.props.auth.error.errorDescription ) {
      this.setState({
        errmsg: nextProps.auth.error.errorDescription
      })
    }

    if (nextProps.auth.isFetching !== this.props.isFetching) {
      this.setState({
        loading: nextProps.auth.isFetching
      })
    }

    if (nextProps.auth.isAuthed !== this.props.isAuthed) {
      if (nextProps.auth.isAuthed) {
        Actions.pop()
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.loading} />
        <View style={styles.banner}>
          <Image
            style={styles.icon}
            source={require('../../assets/python.png')}
          />
        </View>
        <View style={styles.form}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="用户名/邮箱"
              placeholderTextColor="#999"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                this.refs.password.focus()
              }}
              value={this.state.username}
              onChangeText={(username) => this.setState({username: username})}
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              ref="password"
              style={[styles.input]}
              placeholder="密码"
              placeholderTextColor="#999"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              returnKeyType="send"
              onSubmitEditing={() => {
                this.login()
              }}
              value={this.state.password}
              onChangeText={(password) => this.setState({password: password})}
            />
          </View>
          <Text style={[styles.errmsg, this.state.errmsg && styles.show]}>{this.state.errmsg}</Text>
          <Button
            containerStyle={styles.btnWrap}
            style={styles.btn}
            onPress={() => {
              this.login()
            }}
            >登录</Button>
        </View>
      </View>
    )
  }
}

export default connect(state => ({
  auth: state.auth
}))(Login)
