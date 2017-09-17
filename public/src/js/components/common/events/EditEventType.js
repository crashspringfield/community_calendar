import React, { Component } from 'react'
import Datetime from 'react-datetime'
import Select from 'react-select'

import 'react-select/dist/react-select.css'
import styles from './EditEventType.scss'

const descriptions = {
  action: "Ready to get up and do something instead of going to yet another meeting? Want to get involved - or get other people involved! -  in something where you can contribute your time and energy to help people in our local or extended communities? One-time or ongoing projects that need volunteers, cooking or preparing meals for public sharing, community garden workdays, river or park clean-ups, letter-writing nights, and many other events fit into this category.",
  education: "Do you want to find out more about a subject of interest, a local issue or organization, a new skill, technique, or practice? Do you have information, experience, or skills to share? Are you looking to work collaboratively with others to learn together?  Presentations, info sessions, volunteer orientations, classes, workshops, trainings, film screenings, some neighborhood tours, and discussion groups fit into this category.",
  fun: "Building strong relationships with each other is foundational for sustaining the work, and hosting or going to community potlucks, dance parties, festivals, movie nights, arts’n’crafts sessions, and other events without an agenda is an awesome way to do that. Some of these events are also culturally or historically significant. These offer the opportunity to connect with people with whom we already feel kinship or community, or to learn about and honor the experiences and cultures of people with whom we are not connected yet.",
  meeting: "Joking aside, meetings play a significant role in planning and organizing other events, community building, hearing each other, and maintaining connections we already have. Meetings are not always fully participatory - it depends on the organizing institution or group, and the purpose of the meeting. City council, community advisory committees, neighborhood associations, and social justice groups and organizations often have regularly scheduled meetings that are open to the public and would fall under this category. New or ongoing projects might have occasional meetings in order to plan educational or action opportunities; one-time or irregular meetings such as issue-specific town halls or listening sessions would fall under this category.",
  resource: "Anything that meets a physical, emotional, mental, or spiritual need could conceivably qualify as a resource, whether it is something you need to access or something you have to offer. Free meals and/or food distribution, needle exchanges and similar harm reduction events, free markets, clothing swaps, support groups, and low-cost medical, dental, and veterinary clinics are just a few examples.",
  showup: "Strength in numbers, critical mass, sharing the load, being able to accomplish more as a community than as individuals - these were some of the ideas that motivated the creation of this calendar, and some events really need as many people as possible to show up or, if that’s not possible, to let others know what’s going on and that community support and participation at these events is crucial. Vigils, rallies, demonstrations, protests, marches, occupations, benefits and fundraisers are just a few examples. Note: these events are sometimes scheduled on very short notice, in response to crises locally, regionally, and nationally."
}
const options = [
  { value: 'action', label: 'Action' },
  { value: 'education', label: 'Education' },
  { value: 'fun', label: 'Fun' },
  { value: 'meeting', label: 'Meeting'},
  { value: 'resource', label: 'Resources'},
  { value: 'showup', label: 'Show up'}
]

export default class EditEventType extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventType: {},
      details: ''
    }
  }

  handleChange = (eventType) => {
    const details = eventType ? descriptions[eventType.value] : ''
    this.setState({
      eventType,
      details
    })
    if (eventType) {
      this.props.updateEventType(eventType.value)
    }
  }

  render = () =>
    <div className={styles['select-block']}>
      <div className={styles['select-container']}>
        <div className={styles['select-title']}>
          Choose an event type (required)
        </div>
      <Select name="type-of-event"
              placeholder="Event type"
              value={this.state.eventType}
              options={options}
              onChange={this.handleChange} />
      </div>
      <div className={styles['description']}>
        { this.state.details }
      </div>
    </div>
}
