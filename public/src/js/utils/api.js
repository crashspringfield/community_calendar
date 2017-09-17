import axios from 'axios'

export default {

  contact: (body) => axios.post(`api/contact`, body)
    .then(res => {
      if (res.status == 201) {
        return res.data
      }
      throw new Error(res.error)
    }),

  get: (calendar) => axios.get(`api/${calendar}`)
    .then(res => {
      if (res.status == 200) {
        return res.data
      }
      throw new Error(res.error)
    }),

  post: (token, event) => {
    // non-user events are stored differently and must be approved
    const url = token ? `api/events?token=${token}` : `api/unapproved`
    return axios.post(url, event)
      .then(res => {
        if (res.status == 201) {
          return res.data
        }
        throw new Error(res.error)
      })
  },

  update: (token, event, id) => axios.put(`api/events/${id}?token=${token}`, event)
    .then(res => {
      if (res.status == 201) {
        return res.data
      }
      throw new Error(res.error)
    }),

  delete: (token, id) => axios.delete(`api/events/${id}?token=${token}`)
    .then(res => {
      if (res.status == 204) {
        return
      }
      throw new Error(res.error)
    }),

}
