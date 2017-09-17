import React, { Component, PropTypes } from 'react'
import Modal from 'react-modal'

import { api } from '../../utils'
import { ButtonSmall } from '../common'
import { EditContact, EditDayAndTime, EditDescription, EditEventType, EditLink,
         EditLocation, EditTitle } from '../common/events'

import styles from './CreateModal.scss'

export default class CreateModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

  submitEvent = () => {
    const calendarEvent = {
      title: this.state.title,
      start: this.state.start,
      end: this.state.end,
      location: this.state.location,
      eventType: this.state.eventType,
      description: this.state.description,
      link: this.state.link,
      contact: this.state.contact,
      userEmail: this.props.userEmail
    }
    api.post(this.props.token, calendarEvent)
      .then(res => this.setState({ message: 'Event successfully added' }) )
      .catch(err => this.setState({ message: 'Error adding event' }) )
  }

  addAnother = () => this.setState({ message: '' })

  closeModal = () => {
    this.setState({ title: '', start: '', end: '', location: '', eventType: '',
                    description: '', link: '', contact: '', message: ''})
    this.props.onRequestClose()
  }

  renderForm = () =>
    <div className={styles['modal-body']}>
      <div className={styles['create-title']}>
        Add your event
      </div>

      { EditTitle({ updateTitle: this.updateTitle }) }
      { EditDayAndTime({ updateStart: this.updateStart, updateEnd: this.updateEnd }) }
      { EditLocation({ updateLocation: this.updateLocation }) }
      <EditEventType updateEventType={this.updateEventType} />
      { EditDescription({ updateDescription: this.updateDescription }) }
      { EditLink({ updateLink: this.updateLink }) }
      { EditContact({ updateContact: this.updateContact }) }

      <button
        disabled={!this.state.title || !this.state.start || !this.state.end || !this.state.eventType}
        onClick={this.submitEvent}
        className={`btn btn-block btn-register ${styles['submit-button']}`}>
      Submit Event
      </button>
    </div>

  renderComplete = () =>
    <div className={styles['modal-body']}>
      <div className={styles['message']}>
        { this.state.message }
      </div>
      <div className={styles['button-block']}>
      { ButtonSmall({
          handleClick: this.addAnother,
          buttonText: 'Add another'
        }) }
      { ButtonSmall({
          handleClick: this.closeModal,
          buttonText: 'Done'
        }) }
      </div>
    </div>

  render = () =>
    <Modal
      isOpen={this.props.isOpen}
      onRequestClose={this.closeModal}
      contentLabel="Add an event"
      className={styles['event-modal']}
      overlayClassName={styles['event-modal-overlay']} >

      { this.state.message ? this.renderComplete() : this.renderForm() }

    </Modal>
}

CreateModal.propTypes = {
  currentEvent: PropTypes.object,
  token: PropTypes.string,
  userEmail: PropTypes.string
}
