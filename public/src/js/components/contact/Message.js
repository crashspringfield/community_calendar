import React, { Component } from 'react'
import styles from './Message.scss'

const Message = (props) =>
  <div className={styles['input-section']}>
    <div className={styles['input-title']}>
      Message (required)
    </div>
    <textarea
      onChange={props.updateMessage}
      className={`form-control register-field ${styles['message']}`} >
    </textarea>
  </div>

export default Message
