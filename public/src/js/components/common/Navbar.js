import React, { Component } from 'react'

import { ButtonSmall } from './'
import styles from './Navbar.scss'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  renderLogin = () =>
    <ul className={`nav navbar-nav navbar-right`}>
      <li>
        { ButtonSmall({
            handleClick: this.props.openSignup,
            buttonText: 'Sign up'
          }) }
      </li>
      <li>
        { ButtonSmall({
            handleClick: this.props.openLogin,
            buttonText: 'Login'
          }) }
      </li>
    </ul>

  renderLogout = () =>
  <ul className={`nav navbar-nav navbar-right`}>
    <li>
      { ButtonSmall({
          handleClick: this.props.onLogout,
          buttonText: 'Logout'
        }) }
    </li>
  </ul>

  render = () =>
    <nav className={`navbar navbar-expand-sm ${styles['cal-nav']}`}>
      <a className={`navbar-brand`} href="/">AVL Community Calendar</a>
      <button className={`navbar-toggler`} type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`navbar-toggler-icon`}></span>
        <span className={`navbar-toggler-icon`}></span>
        <span className={`navbar-toggler-icon`}></span>
      </button>

      <div className={`collapse navbar-collapse`} id="navbarsExample03">
        <ul className={`navbar-nav mr-auto`}>
          <li className={`nav-item`}>
            <a className={`nav-link`} href="about">About</a>
          </li>
          <li className={`nav-item`}>
            <a className={`nav-link`} href="contact">Contact</a>
          </li>
        </ul>
        {
          this.props.token ? this.renderLogout() : this.renderLogin()
        }
      </div>
    </nav>
}
