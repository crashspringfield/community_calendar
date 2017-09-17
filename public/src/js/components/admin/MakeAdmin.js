import React, { Component, PropTypes } from 'react'

import { admin } from '../../utils'
import { ButtonSmall } from '../common'
import styles from './MakeAdmin.scss'

export default class MakeAdmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount = () => {
    this.getUsers(this.props.token)
  }

  getUsers = (token) => {
    admin.getAllUsers(token)
      .then(users => this.setState({ users }) )
      .catch(err => console.log(err))
  }

  makeAdmin = (user) => {
    admin.makeAdmin(this.props.token, user, user.id)
      .then(() => this.getUsers(this.props.token))
      .catch(err => console.log(err))
  }

  renderUsers = () => this.state.users.map((user, i) =>
    <div key={i} className={styles['user']}>
      <div className={styles['name']}>
        { user.name }
      </div>
      <div className={styles['email']}>
        { user.email }
      </div>
      <div className={styles['bio']}>
        { user.bio }
      </div>
      <div className={`pull-right ${styles['button-block']}`}>
        { ButtonSmall({
          handleClick:() => this.makeAdmin(user),
          buttonText: 'Make admin'
        }) }
      </div>
    </div>
  )

  render = () =>
    <div className={styles['make-admin']}>
      <div className={styles['header']}>
        Give user admin privleges
      </div>
      { this.renderUsers() }
    </div>

}

MakeAdmin.propTypes = {
  token: PropTypes.string
}
