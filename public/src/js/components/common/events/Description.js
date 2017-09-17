import React from 'react'
import styles from './Description.scss'

const Description = (props) =>
  <div className={styles['description-block']}>
    <div className={styles['description']}>
      { props.description }
    </div>
  </div>

export default Description
