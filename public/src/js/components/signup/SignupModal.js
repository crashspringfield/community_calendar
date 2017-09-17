import React, { Component } from 'react'
import Modal from 'react-modal'

import { ButtonLarge } from '../common'
import { Bio, Email, Name, Password } from '../common/user'
import auth from '../../utils/auth'

import styles from './SignupModal.scss'

const successMessage = `
  Your account was successfully created. An admin will review your information
  and email you when you can begin adding events.
  `

const failMessage = `
  There was an error signing you up.
`

export default class SignupModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      bio: '',
      message: ''
    }
  }

  updateName = (e) => this.setState({ name: e.target.value })

  updateEmail = (e) => this.setState({ email: e.target.value })

  updatePassword = (e) => this.setState({ password: e.target.value })

  updateBio = (e) => this.setState({ bio: e.target.value })

  register = () => {
    const visitor = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      bio: this.state.bio
    }
    auth.register(visitor)
      .then(res => this.setState({ message: successMessage }) )
      .catch(err => this.setState({ message: failMessage }) )
  }

  closeModal = () => {
    this.setState({ message: '' })
    this.props.onRequestClose()
  }

  renderSignup = () =>
    <div className={styles['modal-body']}>
      <div className={styles['signup-header']}>
        In an effort to ensure that user-added events to the calendar adhere
        to our guidelines, tell us a little about yourself and what you do in your
        community. Chances are, an admin knows you through the grapevine and
        will be able to verify you within a day or two.
      </div>
      { Name({ updateName: this.updateName }) }
      { Email({ updateEmail: this.updateEmail }) }
      { Password({ updatePassword: this.updatePassword }) }
      { Bio({ updateBio: this.updateBio }) }
      { ButtonLarge({
          handleClick: this.register,
          buttonText: 'Join now!'
        }) }
    </div>

  renderComplete = () =>
    <div className={styles['modal-body']}>
      <div className={styles['message']}>
        { this.state.message }
      </div>
    </div>


  render = () =>
    <Modal
      isOpen={this.props.isOpen}
      onRequestClose={this.closeModal}
      contentLabel="SignUp"
      className={styles['account-modal']}
      overlayClassName={styles['account-modal-overlay']}>
    {
      this.state.message ? this.renderComplete() : this.renderSignup()
    }
    </Modal>
}
