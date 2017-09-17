import React, { Component, PropTypes } from 'react'

import { admin } from '../../utils'
import { ButtonSmall } from '../common'
import styles from './ReviewUsers.scss'

export default class ReviewUsers extends Component {
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
    admin.getNewUsers(token)
      .then(users => this.setState({ users }) )
      .catch(err => console.log(err))
  }

  approveUser = (user) => {
    admin.approveUser(this.props.token, user, user.id)
      .then(() => this.getUsers(this.props.token))
      .catch(err => console.log(err))
  }

  deleteUser = (user) => {
    admin.deleteUser(this.props.token, user.id)
      .then(() => this.getUsers())
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
          handleClick: () => this.approveUser(user),
          buttonText: 'Approve User'
        }) }
        { ButtonSmall({
          handleClick: () => this.deleteUser(user),
          buttonText: 'Delete User'
        })}
      </div>
    </div>
  )

  render = () =>
    <div className={styles['review-users']}>
      <div className={styles['header']}>
        Users needing approval
      </div>
      { this.renderUsers() }
    </div>

}

ReviewUsers.propTypes = {
  token: PropTypes.string
}
