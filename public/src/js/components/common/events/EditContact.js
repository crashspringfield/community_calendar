import React, { Component } from 'react'
import styles from './EditContact.scss'

const EditContact = (props) =>
  <div className={styles['contact']}>
    <div className={styles['contact-label']}>
      Contact
    </div>
    <input
      className={`form-control`}
      defaultValue={props.defaultValue} 
      onChange={props.updateContact} />
  </div>

export default EditContact
