import axios from 'axios'

module.exports = {

  adminLogin: (body) => axios.post(`api/admin-signin`, body)
    .then(res => {
      if (res.status == 200) {
        return res.data
      }
      throw new Error(res.error)
    }),

  login: (body) => axios.post(`api/signin`, body)
    .then(res => {
      if (res.status == 200) {
        return res.data
      }
      throw new Error(res.error)
    }),

  register: (body) => axios.post(`api/register`, body)
    .then(res => {
      if (res.status == 201) {
        return res.data
      }
      throw new Error(res.error)
    }),

  resetPassword: (body) => axios.post(`password/email`, body)
    .then(res => {
      if (res.status == 200) {
        return res.data
      }
      throw new Error(res.error)
    }),
}
