import React from 'react'
import styles from './Link.scss'

const Link = (props) =>
  <div className={styles['link-block']}>
    <a href={`${props.link}`} target="_blank" className={styles['link']}>
      Event Link
    </a>
  </div>

export default Link
