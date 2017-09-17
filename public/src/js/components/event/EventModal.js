import React, { Component, PropTypes } from 'react'
import Modal from 'react-modal'

import { api } from '../../utils'
import { ButtonSmall } from '../common'
import { Contact, DayAndTime, Description, EditContact, EditDayAndTime,
         EditDescription, EditEventType, EditLink, EditLocation, EditTitle,
         Link, Location, Title } from '../common/events'
         
import styles from './EventModal.scss'

export default class EventModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      isComplete: false,
      title: '',
      start: '',
      end: '',
      location: '',
      eventType: '',
      description: '',
      link: '',
      contact: '',
      message: '',
    }
  }

  updateTitle = (e) => this.setState({ title: e.target.value })

  updateStart = (e) => this.setState({ start: e._d })

  updateEnd = (e) => this.setState({ end: e._d })

  updateLocation = (e) => this.setState({ location: e.formatted_address })

  updateEventType = (eventType) => this.setState({ eventType })

  updateDescription = (e) => this.setState({ description: e.target.value })

  updateLink = (e) => this.setState({ link: e.target.value })

  updateContact = (e) => this.setState({ contact: e.target.value })

  editEvent = () => this.setState({ isEditing: true })

  deleteEvent = () => {
    api.delete(this.props.token, this.props.currentEvent.id)
      .then(res => {
        this.setState({
          message: "Event successfully deleted",
          isEditing: false,
          isComplete: true
        })
      })
      .catch(err => console.log(err))
  }

  updateEvent = () => {
    const calendarEvent = {
      title: this.state.title || this.props.currentEvent.title,
      start: this.state.start || this.props.currentEvent.start,
      end: this.state.end || this.props.currentEvent.end,
      location: this.state.location || this.props.currentEvent.location,
      eventType: this.state.eventType || this.props.currentEvent.eventType,
      description: this.state.description || this.props.currentEvent.description,
      link: this.state.link || this.props.currentEvent.link,
      contact: this.state.contact || this.props.currentEvent.contact
    }
    api.update(this.props.token, calendarEvent, this.props.currentEvent.id)
      .then(res => {
        this.setState({
          message: "Event successfully updated",
          isEditing: false,
          isComplete: true
        })
      })
      .catch(err => console.log(err))
  }

  closeModal = () => {
    this.setState({ isEditing: false, isComplete: false })
    this.props.onRequestClose()
  }

  renderIfUser = () =>
    <div className={styles['user-control']}>
      { ButtonSmall({
          handleClick: this.editEvent,
          buttonText: 'Edit event'
        }) }
      { ButtonSmall({
          handleClick: this.deleteEvent,
          buttonText: 'Delete event'
        }) }
    </div>

  renderEvent = () =>
    <div className={styles['modal-body']}>
      { Title({ title: this.props.currentEvent.title }) }
      { DayAndTime({
        start: this.props.currentEvent.start,
        end: this.props.currentEvent.end
      }) }
      {
        this.props.currentEvent.location
        ? Location({ location: this.props.currentEvent.location})
        : ''
      }
      { Description({ description: this.props.currentEvent.description}) }
      {
        this.props.currentEvent.contact
        ? Contact({ contact: this.props.currentEvent.contact })
        : ''
      }
      {
        this.props.currentEvent.link
        ? Link({ link: this.props.currentEvent.link || this.props.currentEvent.glink })
        : ''
      }
      {
        (this.props.userEmail && (this.props.userEmail == this.props.currentEvent.userEmail))
        ? this.renderIfUser()
        : ''
      }
     </div>

  renderEditing = () =>
    <div className={styles['modal-body']}>
      { EditTitle({
        defaultValue: this.props.currentEvent.title,
        updateTitle: this.updateTitle
      }) }
      { EditDayAndTime({
        updateStart: this.updateStart, updateEnd: this.updateEnd
      }) }
      { EditLocation({
        updateLocation: this.updateLocation
      }) }
      <EditEventType updateEventType={this.updateEventType} />
      { EditDescription({
        defaultValue: this.props.currentEvent.description,
        updateDescription: this.updateDescription
      }) }
      { EditLink({
        defaultValue: this.props.currentEvent.link,
        updateLink: this.updateLink
      }) }
      { EditContact({
        defaultValue: this.props.currentEvent.contact,
        updateContact: this.updateContact
      }) }
      { ButtonSmall({
          handleClick: this.updateEvent,
          buttonText: 'Update event'
        }) }
    </div>

  renderComplete = () =>
    <div className={styles['modal-body']}>
      <div className={styles['message']}>
        { this.state.message }
      </div>
      { ButtonSmall({
          handleClick: this.closeModal,
          buttonText: 'Return to calendar'
        }) }
    </div>

  renderBody = () => {
    switch(true) {
      case !this.state.isEditing && !this.state.isComplete:
        return this.renderEvent()
        break
      case this.state.isEditing && !this.state.isComplete:
        return this.renderEditing()
        break
      case !this.state.isEditing && this.state.isComplete:
        return this.renderComplete()
        break
      default:
        return
    }
  }

  render = () =>
    <Modal
      isOpen={this.props.isOpen}
      onRequestClose={this.props.onRequestClose}
      contentLabel={`${this.props.currentEvent.title}`}
      className={styles['event-modal']}
      overlayClassName={styles['event-modal-overlay']} >
      {
        this.renderBody()
      }
    </Modal>
}

EventModal.propTypes = {
  currentEvent: PropTypes.object,
  token: PropTypes.string,
  userEmail: PropTypes.string
}
