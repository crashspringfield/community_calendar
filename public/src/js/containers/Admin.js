import React, { Component } from 'react'

import { ButtonLarge } from '../components/common'
import { Login, NavAdmin, MakeAdmin, ReviewEvents, ReviewUsers } from '../components/admin'

import styles from './Admin.scss'

export default class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      show: ''
    }
  }

  closeLogin = (token, email) => this.setState({ token })

  onLogout = () => this.setState({ token: '' })

  showEvents = () => this.setState({ show: 'events' })

  showAllUsers = () => this.setState({ show: 'all-users' })

  showNewUsers = () => this.setState({ show: 'new-users' })

  renderView = () => {
    switch(true) {
      case this.state.show == 'events':
        return (<ReviewEvents token={this.state.token} />)
        break
      case this.state.show =='new-users':
        return (<ReviewUsers token={this.state.token} />)
        break
      case this.state.show == 'all-users':
        return (<MakeAdmin token={this.state.token} />)
        break
      default:
        return ''
    }
  }

  renderIfAdmin = () =>
    <div className={styles['admin']}>
      <NavAdmin
        showEvents={this.showEvents}
        showAllUsers={this.showAllUsers}
        showNewUsers={this.showNewUsers}
        onLogout={this.onLogout}
        />
      {this.renderView()}
    </div>

  render = () =>
    <div className={styles['admin-page']}>
      {
        this.state.token
        ? this.renderIfAdmin()
        : <Login onRequestClose={this.closeLogin} />
      }
    </div>
}
