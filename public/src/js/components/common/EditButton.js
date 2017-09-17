import React, { Component } from 'react'
import styles from './EditButton.scss'

const EditButton = (props) =>
  <div className={styles['forgot-link']} onClick={props.handleClick}>
    {props.editText}
  </div>

export default EditButton
