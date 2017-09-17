import React, { Component } from 'react'
import styles from './Password.scss'

const Password = (props) =>
  <div className={styles['input-section']}>
    <div className={styles['input-title']}>
      Password
    </div>
    <input type="password"
      className={`form-control ${styles['input']}`}
      onChange={props.updatePassword} />
  </div>

export default Password
