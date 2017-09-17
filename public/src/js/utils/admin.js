import axios from 'axios'

export default {

  getEvents: (token) => axios.get(`api/unapproved?token=${token}`)
    .then(res => {
      if (res.status == 200) {
        return res.data
      }
      throw new Error(res.error)
    }),

  approveEvent: (token, event, id) => axios.put(`api/unapproved/${id}?token=${token}`, event)
    .then(res => {
      if (res.status == 201) {
        return res.data
      }
      throw new Error(res.error)
    }),

  deleteEvent: (token, id) => axios.delete(`api/unapproved/${id}?token=${token}`)
    .then(res => {
      if (res.status == 204) {
        return
      }
      throw new Error(res.error)
    }),

  getNewUsers: (token) => axios.get(`api/new-users?token=${token}`)
    .then(res => {
      if (res.status == 200) {
        return res.data
      }
      throw new Error(res.error)
    }),

  getAllUsers: (token) => axios.get(`api/all-users?token=${token}`)
    .then(res => {
      if (res.status == 200) {
        return res.data
      }
      throw new Error(res.error)
    }),

  approveUser: (token, user, id) => axios.put(`api/new-users/${id}?token=${token}`, user)
    .then(res => {
      if (res.status == 201) {
        return res.data
      }
      throw new Error(res.error)
    }),

  makeAdmin: (token, user, id) => axios.put(`api/make-admin/${id}?token=${token}`, user)
    .then(res => {
      if (res.status == 201) {
        return res.data
      }
      throw new Error(res.error)
    }),

  deleteUser: (token, id) => axios.delete(`api/new-users/${id}?token=${token}`)
    .then(res => {
      if (res.status == 204) {
        return
      }
      throw new Error(res.error)
    }),

}
