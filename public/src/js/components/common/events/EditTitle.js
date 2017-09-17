import React, { Component } from 'react'
import styles from './EditTitle.scss'

const EditTitle = (props) =>
  <div className={styles['title']}>
    <div className={styles['title-label']}>
      Event name (required)
    </div>
    <input
      className={`form-control`}
      defaultValue={props.defaultValue} 
      onChange={props.updateTitle} />
  </div>

export default EditTitle
