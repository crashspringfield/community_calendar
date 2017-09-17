import React, { Component } from 'react'
import styles from './Title.scss'

const Title = (props) =>
  <div className={styles['input-section']}>
    <div className={styles['input-title']}>
      Title (required)
    </div>
    <input
      className={`form-control ${styles['input']}`}
      onChange={props.updateTitle} />
  </div>

export default Title
