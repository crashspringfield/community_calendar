import React, { Component } from 'react'
import styles from './Bio.scss'

const Bio = (props) =>
  <div className={styles['input-section']}>
    <div className={styles['input-title']}>
      Bio
    </div>
    <textarea
      onChange={props.updateBio}
      className={`form-control register-field ${styles['bio']}`} >
    </textarea>
  </div>

export default Bio
