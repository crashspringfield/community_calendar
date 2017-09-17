import React, { Component } from 'react'
import styles from './Title.scss'

const Title = (props) =>
  <div className={styles['event-title']}>
    { props.title }
  </div>

export default Title
