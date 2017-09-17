import React, { Component } from 'react'
import Modal from 'react-modal'

import { ButtonLarge } from '../common'
import { Email, Password } from '../common/user'
import auth from '../../utils/auth'

import styles from './LoginModal.scss'

export default class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      forgot: false,
      message: '',
    }
  }

  updateEmail = (e) => this.setState({ email: e.target.value })

  updatePassword = (e) => this.setState({ password: e.target.value })

  login = () => {
    const visitor = {
      email: this.state.email,
      password: this.state.password
    }
    auth.login(visitor)
      .then(data => this.props.onRequestClose(data.token, data.email) )
      .catch(err => this.setState({ message: "Invalid email or password" }) )
  }

  resetPassword = () => {
    auth.resetPassword({ email: this.state.email })
      .then(res => this.closeModal())
      .catch(err => this.setState({ message: "No such email exists" }) )
  }

  closeModal = () => {
    this.setState({ forgot: false })
    this.props.onRequestClose(null, null)
  }

  renderError = () =>
    <div className={styles['error']}>
      { this.state.message }
    </div>

  renderLoginForm = () =>
    <div className={styles['modal-body']}>
       { Email({ updateEmail: this.updateEmail }) }
       { Password({ updatePassword: this.updatePassword }) }
       { ButtonLarge({
           handleClick: this.login,
           buttonText: 'Login'
         }) }
       <div className={styles['forgot-link']} onClick={() => this.setState({ forgot: true })}>
         Forgot password?
       </div>
       { this.state.message ? this.renderError() : '' }
     </div>

  renderResetForm = () =>
    <div className={styles['modal-body']}>
      <div className={styles['forgot-title']}>
        Please enter your email
      </div>
      { Email({ updateEmail: this.updateEmail }) }
      { ButtonLarge({
        handleClick: this.resetPassword,
        buttonText: 'Reset password'
        }) }
       <div className={styles['forgot-link']} onClick={() => this.setState({ forgot: false })}>
         Back to login
       </div>
       { this.state.message ? this.renderError() : '' }
     </div>

  render = () =>
    <Modal
      isOpen={this.props.isOpen}
      onRequestClose={this.closeModal}
      contentLabel="Login"
      className={styles['account-modal']}
      overlayClassName={styles['account-modal-overlay']}>
      {
        this.state.forgot ? this.renderResetForm() : this.renderLoginForm()
      }
    </Modal>
}
