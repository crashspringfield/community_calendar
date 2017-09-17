import React from 'react'
import styles from './Contact.scss'

const Contact = (props) =>
  <div className={styles['contact-block']}>
    <span className={styles['contact-title']}>
      Contact:
    </span>
    <span className={styles['contact']}>
      { props.contact }
    </span>
  </div>

export default Contact
