import React, { Component } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import { Message, Title } from '../components/contact'
import { ButtonLarge, Navbar, Footer } from '../components/common'
import { Email } from '../components/common/user'
import LoginModal from '../components/login/LoginModal'
import SignupModal from '../components/signup/SignupModal'
import { api } from '../utils'

import styles from './Contact.scss'

const CAPTCHA = "6LdU3zAUAAAAAAMrq5yooJdXgRhJ-exPxA3sVzZJ"

export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginIsOpen: false,
      signupIsOpen: false,
      token: '',
      email: '',
      contactEmail: '',
      title: '',
      message: '',
      response: ''

    }
  }

  componentDidMount = () => {
    this.getCurrentUser()
  }

  componentWillUnmount = () => {
    this.setState({
      contactEmail: '',
      title: '',
      message: '',
      response: ''
    })
  }

  getCurrentUser = () => {
    if (this.state.token && this.state.email) {
      return
    }
    const token = window.sessionStorage.getItem('token')
    const email = window.sessionStorage.getItem('email')
    this.setState({ token, email })
  }

  openLogin = () => this.setState({ loginIsOpen: true })

  closeLogin = (token, email) => {
    if (typeof token != 'string') {
      this.setState({ loginIsOpen: false })
      return
    }
    window.sessionStorage.setItem('token', token)
    window.sessionStorage.setItem('email', email)
    this.setState({
      token,
      email,
      loginIsOpen: false
    })
  }

  openSignup = () => this.setState({ signupIsOpen: true })

  onLogout = () => {
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('email')
    this.setState({ token: '', email: '' })
  }

  updateEmail = (e) => this.setState({ contactEmail: e.target.value })

  updateTitle = (e) => this.setState({ title: e.target.value })

  updateMessage = (e) => this.setState({ message: e.target.value })

  recaptchaCallback = (response) => this.setState({ response })

  submitContactForm = () => {
    const body = {
      secret: CAPTCHA,
      'g-recaptcha-response': this.state.response,
      email: this.state.contactEmail,
      title: this.state.title,
      message: this.state.message,
    }
    api.contact(body)
      .then(data => this.setState({ reply: "Your message was successfully received" }) )
      .catch(err => this.setState({ reply: err }))
  }

  renderContactForm = () =>
    <div>
      { Email({ updateEmail: this.updateEmail }) }
      { Title({ updateTitle: this.updateTitle }) }
      { Message({ updateMessage: this.updateMessage }) }
      <div className={styles['captcha']}>
        <ReCAPTCHA
          ref="recaptcha"
          onChange={this.recaptchaCallback}
          sitekey={CAPTCHA}
        />
      </div>
      { ButtonLarge({ buttonText: 'Contact Us', handleClick: this.submitContactForm }) }
    </div>

  renderReply = () =>
    <div className={styles['reply']}>
      {this.state.reply}
    </div>

  render = () =>
    <div className={styles['contact']}>
      <Navbar
        openLogin={this.openLogin}
        openSignup={this.openSignup}
        onLogout={this.onLogout}
        token={this.state.token} />

      <div className={styles['contact-container']}>

        { this.state.reply ? this.renderReply() : this.renderContactForm() }

      <SignupModal
        isOpen={this.state.signupIsOpen}
        onRequestClose={() => {this.setState({ signupIsOpen: false })}} />

      <LoginModal
        isOpen={this.state.loginIsOpen}
        onRequestClose={this.closeLogin} />
      </div>

      <Footer />
    </div>
}
