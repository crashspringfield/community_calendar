import React, { Component } from 'react'
import styles from './Location.scss'

const Location = (props) =>
  <div className={styles['location-block']}>
    <span className={styles['location-title']}>
      Location:
    </span>
    <span className={styles['location']}>
      { props.location }
    </span>
  </div>

export default Location
