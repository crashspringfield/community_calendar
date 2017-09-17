import React, { Component } from 'react'
import styles from './DayAndTime.scss'

const convertToDate = (dateTime) => new Date(dateTime).toLocaleDateString()
const convertToTime = (dateTime) => new Date(dateTime).toLocaleTimeString()

const DayAndTime = (props) =>
  <div>
    <div className={styles['time-block']}>
      <span className={styles['time-title']}>
        Start:
      </span>
      <span className={styles['date']}>
        { convertToDate(props.start) }
      </span>
      <span className={styles['divider-line']}> - </span>
      <span className={styles['time']}>
        { convertToTime(props.start) }
      </span>
    </div>

    <div className={styles['time-block']}>
      <span className={styles['time-title']}>
        End:
      </span>
      <span className={styles['date']}>
        { convertToDate(props.end) }
      </span>
      <span className={styles['divider-line']}> - </span>
      <span className={styles['time']}>
        { convertToTime(props.end) }
      </span>
    </div>
  </div>

export default DayAndTime
