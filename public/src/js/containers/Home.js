import React, { Component } from 'react'

import { Navbar, Footer } from '../components/common'
import { Calendar } from '../components/home'
import EventModal from '../components/event/EventModal'
import CreateModal from '../components/create/CreateModal'
import LoginModal from '../components/login/LoginModal'
import SignupModal from '../components/signup/SignupModal'
import { api, googleCal } from '../utils'

import styles from './Home.scss'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      createIsOpen: false,
      eventIsOpen: false,
      loginIsOpen: false,
      signupIsOpen: false,
      googleEvents: [],
      sqlEvents: [],
      currentEvent: {},
      slot: {},
      token: '',
      email: ''
    }
  }

  componentDidMount = () => {
    this.getSqlEvents()
    this.getCurrentUser()
    this.getRecentGoogleEvents()
  }

  getSqlEvents = () => {
    api.get('events')
      .then(sqlEvents => this.setState({ sqlEvents }) )
      .catch(err => console.log(err.response.statusText))
  }

  getRecentGoogleEvents = () => {
    googleCal.getAllCalendars(50, 10)
      .then(events => {
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        const currentMonth = currentDate.getMonth()
        const recent = events.filter(event => {
          const eventDate = new Date(event.start)
          if ((eventDate.getFullYear() >= currentYear) &&
              (eventDate.getMonth() > currentMonth - 1 )) {
            return event
          }
        })
        this.setState({ googleEvents: recent })
      })
      .catch(err => console.log(err))
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

  onSelectEvent = (currentEvent) => {
    this.setState({ currentEvent, eventIsOpen: true })
  }

  onSelectSlot = (slot) => {
    this.setState({ slot, createIsOpen: true })
  }

  render = () =>
    <div className={styles['home']}>
      <Navbar
        openLogin={this.openLogin}
        openSignup={this.openSignup}
        onLogout={this.onLogout}
        token={this.state.token} />

      <div className={styles['home-container']}>

        <Calendar
          googleLoaded={this.state.googleEvents.length}
          sqlLoaded={this.state.sqlEvents.length}
          events={ this.state.sqlEvents.concat(this.state.googleEvents)}
          onSelectEvent={this.onSelectEvent}
          onSelectSlot={this.onSelectSlot} />

        <CreateModal
          slot={this.state.slot}
          token={this.state.token}
          userEmail={this.state.email}
          isOpen={this.state.createIsOpen}
          onRequestClose={() => { this.setState({createIsOpen: false, slot: {} })} } />

        <EventModal
          token={this.state.token}
          userEmail={this.state.email}
          currentEvent={this.state.currentEvent}
          isOpen={this.state.eventIsOpen}
          onRequestClose={() => {this.setState({ eventIsOpen: false, currentEvent: {} })}} />

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
