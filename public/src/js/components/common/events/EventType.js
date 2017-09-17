import React from 'react'
import styles from './EventType.scss'

const EventType = (props) =>
  <div className={styles['event-type-block']}>
    <div className={styles['event-type']}>
      { props.eventType }
    </div>
  </div>

export default EventType
