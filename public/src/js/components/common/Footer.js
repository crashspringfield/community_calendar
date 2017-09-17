import React, { Component } from 'react'
import styles from './Footer.scss'

const Footer = (props) =>
  <div className={styles['footer']}>
    <div className={styles['footer-text']}>
      <a href="mailto:avlcommunityaction@gmail.com" className={styles['email']}>
        avlcommunityaction@gmail.com
      </a>
    </div>
  </div>

export default Footer
