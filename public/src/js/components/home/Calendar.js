import React, { Component, PropTypes } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import Select from 'react-select'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import styles from './Calendar.scss'

BigCalendar.momentLocalizer(moment)
const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
const options = [
  { value: 'action', label: 'Action' },
  { value: 'education', label: 'Education' },
  { value: 'fun', label: 'Fun' },
  { value: 'meeting', label: 'Meeting'},
  { value: 'resource', label: 'Resources'},
  { value: 'showup', label: 'Show up'}
]

export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [
        { value: 'action', label: 'Action' },
        { value: 'education', label: 'Education' },
        { value: 'fun', label: 'Fun' },
        { value: 'meeting', label: 'Meeting'},
        { value: 'resource', label: 'Resources'},
        { value: 'showup', label: 'Show up'}
      ],
      show: [],
      callOnce: false
    }
  }

  componentDidMount = () => {
    console.log('mounting', this.props.events)
  }

  componentDidUpdate = () => {
    console.log('updating', this.props.events)
    if ((this.props.events.length) &&
        (this.state.show.length == 0) &&
        (this.props.googleLoaded) &&
        (this.props.sqlLoaded) &&
        (!this.state.callOnce)) {
      this.displayWhichCalendars()
      this.setState({ callOnce: true }) // hack b/c removing all calendars excedes callstack
    }
  }

  handleChange = (value) => {
    this.setState({ value }, () => {
      this.displayWhichCalendars()
    })
  }

  displayWhichCalendars = () => {
    const values = this.state.value.map(v => v.value)
    const show = this.props.events.filter(event => values.indexOf(event.eventType) > -1 )
    this.setState({ show })
  }

  render = () =>
    <div className={styles['home-container']}>
      <div className={styles['select-container']}>
        <Select
          name="type-of-event"
          placeholder="Display..."
          multi={true}
          value={this.state.value}
          options={options}
          onChange={this.handleChange} />
      </div>
      <div className={styles['calendar-container']}>
        <BigCalendar
          popup={true}
          events={this.state.show}
          defaultView={(width < 768) ? 'agenda' : 'month'}
          selectable
          onSelectEvent={currentEvent => this.props.onSelectEvent(currentEvent)}
          onSelectSlot={slot => this.props.onSelectSlot(slot)}
          />
      </div>
    </div>
}

Calendar.propTypes = {
  events: PropTypes.array
}
