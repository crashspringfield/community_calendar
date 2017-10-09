import React, { Component, PropTypes } from 'react'

import { admin } from '../../utils'
import { ButtonSmall, EditButton } from '../common'
import { Contact, DayAndTime, Description, EditContact, EditDayAndTime,
         EditDescription, EditEventType, EditLink, EditLocation, EditTitle,
         EventType, Link, Location, Title } from '../common/events'
import styles from './ReviewEvent.scss'

export default class ReviewEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditingTitle: false,
      title: '',
      isEditingTime: false,
      start: '',
      end: '',
      isEditingLocation: false,
      location: '',
      isEditingEventType: false,
      eventType: '',
      isEditingDescription: false,
      description: '',
      isEditingLink: false,
      link: '',
      isEditingContact: false,
      contact: ''
    }
  }

  editTitle = () => this.setState({ isEditingTitle: !this.state.isEditingTitle })
  updateTitle = (e) => this.setState({ title: e.target.value })

  editTime = () => this.setState({ isEditingTime: !this.state.isEditingTime })
  updateStart = (e) => this.setState({ start: e._d })
  updateEnd = (e) => this.setState({ end: e._d })

  editLocation = () => this.setState({ isEditingLocation: !this.state.isEditingLocation })
  updateLocation = (e) => this.setState({ location: e.formatted_address })

  editEventType = () => this.setState({ isEditingEventType: !this.state.isEditingEventType })
  updateEventType = (eventType) => this.setState({ eventType })

  editDescription = () => this.setState({ isEditingDescription: !this.state.isEditingDescription })
  updateDescription = (e) => this.setState({ description: e.target.value })

  editLink = () => this.setState({ isEditingLink: !this.state.isEditingLink })
  updateLink = (e) => {
    // because the link href on the Link component is picky
    const link = (e.target.value.substring(0,4) == 'http') ? e.target.value : `http://${e.target.value}`
    this.setState({ link })
  }

  editContact = () => this.setState({ isEditingContact: !this.state.isEditingContact })
  updateContact = (e) => this.setState({ contact: e.target.value })

  approveEvent = (event) => {
    const approvedEvent = {
      title: this.state.title || this.props.event.title,
      start: this.state.start || this.props.event.start,
      end: this.state.end || this.props.event.end,
      location: this.state.location || this.props.event.location,
      eventType: this.state.eventType || this.props.event.eventType,
      description: this.state.description || this.props.event.description,
      link: this.state.link || this.props.event.link,
      contact: this.state.contact || this.props.event.contact
    }
    admin.approveEvent(this.props.token, approvedEvent, this.props.event.id)
      .then(() => this.props.updateEvents())
      .catch(err => console.log(err))
  }

  deleteEvent = (event) => {
    admin.deleteEvent(this.props.token, this.props.event.id)
      .then(() => this.props.updateEvents())
      .catch(err => console.log(err))
  }

  renderTitle = () =>
    <div className={styles['title']}>
      {
        this.state.isEditingTitle
        ? <EditTitle defaultValue={this.props.event.title} updateTitle={this.updateTitle} />
        : <Title title={this.state.title || this.props.event.title} />
      }
      { EditButton({
          handleClick: this.editTitle,
          editText: this.state.isEditingTitle ? 'Update' : 'Edit title'
        }) }
    </div>

  renderDayAndTime = () =>
    <div className={styles['day-and-time']}>
      {
        this.state.isEditingTime
        ? <EditDayAndTime updateStart={this.updateStart} updateEnd={this.updateStart}/>
        : <DayAndTime start={this.state.start || this.props.event.start} end={this.state.end || this.props.event.end}/>
      }
      { EditButton({
          handleClick: this.editTime,
          editText: this.state.isEditingTime ? 'Update' :'Edit time'
        }) }
    </div>

  renderLocation = () =>
    <div className={styles['location']}>
      {
        this.state.isEditingLocation
        ? <EditLocation defaultValue={this.props.event.location} updateLocation={this.updateLocation} />
        : <Location location={this.state.location || this.props.event.location} />
      }
      { EditButton({
          handleClick: this.editLocation,
          editText: this.state.isEditingLocation ? 'Update' :'Edit location'
        }) }
    </div>

  renderEventType = () =>
    <div className={styles['event-type']}>
      {
        this.state.isEditingEventType
        ? <EditEventType updateEventType={this.updateEventType} />
        : <EventType eventType={this.state.eventType || this.props.event.eventType} />
      }
      <div className={styles['button-block']}>
      { EditButton({
          handleClick: this.editEventType,
          editText: this.state.isEditingEventType ? 'Update' :'Edit event type'
        }) }
      </div>
    </div>

  renderDescription = () =>
    <div className={styles['description']}>
      {
        this.state.isEditingDescription
        ? <EditDescription defaultValue={this.props.event.description} updateDescription={this.updateDescription} />
        : <Description description={this.state.description || this.props.event.description} />
      }
      <div className={styles['button-block']}>
      { EditButton({
          handleClick: this.editDescription,
          editText: this.state.isEditingDescription ? 'Update' :'Edit description'
        }) }
      </div>
    </div>

  renderLink = () =>
    <div className={styles['link']}>
      {
        this.state.isEditingLink
        ? <EditLink defaultValue={this.props.event.link} updateLink={this.updateLink} />
        : <Link link={this.state.link || this.props.event.link} />
      }
      { EditButton({
          handleClick: this.editLink,
          editText: this.state.isEditingLink ? 'Update' :'Edit link'
        }) }
    </div>

  renderContact = () =>
    <div className={styles['contact']}>
      {
        this.state.isEditingContact
        ? <EditContact defaultValue={this.props.event.contact} updateContact={this.updateContact} />
        : <Contact contact={this.state.contact || this.props.event.contact} />
      }
      { EditButton({
          handleClick: this.editContact,
          editText: this.state.isEditingContact ? 'Update' :'Edit contact'
        }) }
    </div>

  render = () =>
    <div className={styles['event']}>
      { this.renderTitle() }
      { this.renderDayAndTime() }
      { this.renderLocation() }
      { this.renderEventType() }
      { this.renderDescription() }
      { this.renderLink() }
      { this.renderContact() }
      <div className={`pull-right ${styles['button-block']}`}>
        { ButtonSmall({
            handleClick: this.approveEvent,
            buttonText: 'Approve event'
          }) }
        { ButtonSmall({
            handleClick: this.deleteEvent,
            buttonText: 'Delete event'
        }) }
      </div>
    </div>
}

ReviewEvent.propTypes = {
  event: PropTypes.object,
  token: PropTypes.string
}
