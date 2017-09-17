import React, { Component } from 'react'
import styles from './EditLink.scss'

const EditLink = (props) =>
  <div className={styles['link']}>
    <div className={styles['link-label']}>
      Event Url
    </div>
    <input
      className={`form-control`}
      defaultValue={props.defaultValue} 
      onChange={props.updateLink} />
  </div>

export default EditLink
