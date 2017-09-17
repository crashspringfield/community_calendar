import React, { Component } from 'react'

import { Navbar, Footer } from '../components/common'
import LoginModal from '../components/login/LoginModal'
import SignupModal from '../components/signup/SignupModal'

import styles from './About.scss'

export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginIsOpen: false,
      signupIsOpen: false,
      token: '',
      email: ''
    }
  }

  componentDidMount = () => {
    this.getCurrentUser()
  }

  getCurrentUser = () => {
    if (this.state.token && this.state.email) {
      return
    }
    const token = window.sessionStorage.getItem('token')
    const email = window.sessionStorage.getItem('email')
    this.setState({ token, email })
  }

  openLogin = () => { this.setState({ loginIsOpen: true })}

  closeLogin = (token, email) => {
    // make sure token is String and not Object (i.e. rejection)
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

  openSignup = () => { this.setState({ signupIsOpen: true })}

  onLogout = () => {
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('email')
    this.setState({ token: '', email: '' })
  }

  render = () =>
    <div className={styles['about']}>
      <Navbar
        openLogin={this.openLogin}
        openSignup={this.openSignup}
        onLogout={this.onLogout}
        token={this.state.token} />

      <div className={styles['about-container']}>
        <div className={`row`}>
          <div className={`col-md-12`}>
            <div className={styles['about-title']}>Our Mission</div>
            <div className={styles['about-paragraph']}>
     The idea of a community calendar is not new, nor is the desire to bring various community groups
     together in order to effect greater social change, and make our communities stronger and more resilient
     in the face of oppression, injustice, and systemic issues that impact everyone in various ways and cannot
     be adequately addressed by individual changes in behavior or attitude. Asheville Community Action
     Calendar is an initiative that was premised on using a calendar as a decentralized, non-hierarchical
     tool to foster connections and collaborations between individuals, groups, and certain institutions
     in Asheville that are interested in building the world that we want to live in.
              </div>
              <div className={styles['about-paragraph']}>
      What does that world look like? ACAC supports anti-racism, intersectional feminism, immigrant justice,
      queer liberation, prisoner support, anti-fascism, youth empowerment, community empowerment, horizontal
      organizing, consensus-based decision making, equitable distribution of resources, and working for change
      outside of currently existing systems and structures. ACAC also recognizes that diverse communities with
      diverse needs and experiences often have shared values and ideals, but disagree about tactics or end
      goals. Hence, events may range the gamut from progressive to more radical perspectives.
              </div>
              <div className={styles['about-paragraph']}>
      The calendar is meant to share information about events that are happening, but also to address the
      issue of fragmentation and splitting forces when scheduling future events. People generally have limited
      time and energy, and it’s highly unlikely that anyone can be in more than one place simultaneously. The
      calendar is intended to facilitate support for and attendance at  already-scheduled events that are aligned
      with someone’s personal or group mission, and being mindful when organizing new events of what else is
      going on in the community at the same time or around the same cause.
              </div>
              <div className={styles['about-paragraph']}>
      The project is still in development, and we hope it will be a useful tool for our community that will
      become more useful as it grows. Please contact us if you have questions or feedback.
              </div>
            </div>
          </div>
        </div>

        <SignupModal
          isOpen={this.state.signupIsOpen}
          onRequestClose={() => {this.setState({ signupIsOpen: false })}} />

        <LoginModal
          isOpen={this.state.loginIsOpen}
          onRequestClose={this.closeLogin} />

        <Footer />
    </div>
}
