import React, { Component } from 'react'
import styles from './ButtonSmall.scss'

const ButtonSmall = (props) =>
  <button
    onClick={props.handleClick}
    className={`btn btn-register ${styles['submit-button']}`}>
    { props.buttonText }
  </button>

export default ButtonSmall
