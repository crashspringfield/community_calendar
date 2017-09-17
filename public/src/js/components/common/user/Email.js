import React, { Component } from 'react'
import styles from './Email.scss'

const Email = (props) =>
  <div className={styles['input-section']}>
    <div className={styles['input-title']}>
      Email (required)
    </div>
    <input className={`form-control ${styles['input']}`} onChange={props.updateEmail} />
  </div>

export default Email
