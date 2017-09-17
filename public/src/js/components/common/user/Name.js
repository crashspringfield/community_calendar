import React, { Component } from 'react'
import styles from './Name.scss'

const Name = (props) =>
  <div className={styles['input-section']}>
    <div className={styles['input-title']}>
      Name
    </div>
    <input className={`form-control ${styles['input']}`} onChange={props.updateName} />
  </div>

export default Name
