import React, { Component } from 'react'
import Datetime from 'react-datetime'

import 'react-datetime/css/react-datetime.css'
import styles from './EditDayAndTime.scss'

const valid = (current) =>
  current.isAfter( Datetime.moment().subtract(1, 'day') )

const EditDayAndTime = (props) =>
  <div className={styles['day-and-time']}>
    <div className={styles['start-block']}>
      <span className={styles['time-title']}>Start (required)</span>
      <Datetime
        onChange={props.updateStart}
        isValidDate={valid} />
    </div>

    <div className={styles['end-block']}>
      <span className={styles['time-title']}>End (required)</span>
        <Datetime
          onChange={props.updateEnd}
          isValidDate={valid} />
    </div>
  </div>

export default EditDayAndTime
