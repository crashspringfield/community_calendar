import React, { Component, PropTypes } from 'react'

import { admin } from '../../utils'
import { ReviewEvent } from './'
import styles from './ReviewEvents.scss'

export default class ReviewEvents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }

  componentDidMount = () => {
    this.getEvents()
  }

  getEvents = () => {
    admin.getEvents(this.props.token)
      .then(events => this.setState({ events }) )
      .catch(err => console.log(err))
  }

  renderEvents = () => this.state.events.map((event, i) =>
    <div key={i} className={styles['event']}>
      <ReviewEvent
        event={event}
        token={this.props.token}
        updateEvents={this.getEvents} />
    </div>
  )

  render = () =>
    <div className={styles['review-events']}>
      <div className={styles['header']}>
        Events needing approval
      </div>
     { this.renderEvents() }
    </div>

}

ReviewEvents.propTypes = {
  token: PropTypes.string
}
