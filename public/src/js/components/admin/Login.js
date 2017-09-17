import React, { Component } from 'react'

import { ButtonLarge } from '../common'
import { Email, Password } from '../common/user'
import { auth } from '../../utils'
import styles from './Login.scss'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      message: ''
    }
  }

  updateEmail = (e) => this.setState({ email: e.target.value })

  updatePassword = (e) => this.setState({ password: e.target.value })

  login = () => {
    const visitor = {
      email: this.state.email,
      password: this.state.password
    }
    auth.adminLogin(visitor)
      .then(data => this.props.onRequestClose(data.token, data.email) )
      .catch(err => this.setState({ message: "Invalid email or password"}) )
  }

  renderError = () =>
    <div className={styles['error']}>
      { this.state.message }
    </div>

  render = () =>
    <div className={styles['login']}>
      { Email({ updateEmail: this.updateEmail }) }
      { Password({ updatePassword: this.updatePassword }) }
      { ButtonLarge({
          handleClick: this.login,
          buttonText: 'Login'
        }) }
      { this.state.message ? this.renderError() : '' }
    </div>
}
