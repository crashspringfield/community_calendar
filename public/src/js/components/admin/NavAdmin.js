import React, { Component } from 'react'

import { ButtonSmall } from '../common'
import styles from './NavAdmin.scss'

export default class NavAdmin extends Component {
  constructor(props) {
    super(props)
  }

  render = () =>
    <nav className={`navbar navbar-expand-sm ${styles['admin-nav']}`}>
      <a className={`navbar-brand`} href="/calendar/public/">Calendar</a>
      <button className={`navbar-toggler`} type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`navbar-toggler-icon`}></span>
      </button>

      <div className={`collapse navbar-collapse`} id="navbarsExample03">
        <ul className={`nav navbar-nav navbar-right`}>
          <li className={styles['nav-button']}>
            { ButtonSmall({
                handleClick: this.props.showEvents,
                buttonText: 'Review events'
              }) }
          </li>
          <li className={styles['nav-button']}>
            { ButtonSmall({
                handleClick: this.props.showNewUsers,
                buttonText: 'Review new users'
              }) }
          </li>
          <li className={styles['nav-button']}>
            { ButtonSmall({
                handleClick: this.props.showAllUsers,
                buttonText: 'Make admins'
              }) }
          </li>
          <li className={styles['nav-button']}>
            { ButtonSmall({
                handleClick: this.props.onLogout,
                buttonText: 'Logout'
              }) }
          </li>
        </ul>
      </div>
    </nav>
}
