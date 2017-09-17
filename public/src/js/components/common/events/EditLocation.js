import React, { Component } from 'react'
import Autocomplete from 'react-google-autocomplete'
import styles from './EditLocation.scss'

const EditLocation = (props) =>
  <div className={styles['location']}>
    <div className={styles['location-label']}>
      Event location
    </div>
    <Autocomplete
      className="form-control"
      style={{width: '90%'}}
      onPlaceSelected={props.updateLocation}
      types={['geocode']}
    />
  </div>

export default EditLocation
