import React, { Component } from 'react'
import styles from './EditDescription.scss'

const EditDescription = (props) =>
  <div className={styles['description']}>
    <div className={styles['description-label']}>
      Describe your event
    </div>
    <textarea
      className={`form-control ${styles['description-text']}`}
      defaultValue={props.defaultValue}
      onChange={props.updateDescription}>
    </textarea>
  </div>

export default EditDescription
