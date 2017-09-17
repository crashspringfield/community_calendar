import React, { Component } from 'react'
import styles from './ButtonLarge.scss'

const ButtonLarge = (props) =>
  <button
    onClick={props.handleClick}
    className={`btn btn-block btn-register ${styles['submit-button']}`}>
    { props.buttonText }
  </button>

export default ButtonLarge
