import axios from 'axios'

const userApi = {
  getUsers: (params) => {
    const url = '/api/v1/users'
    return axios.get(url, { params })
  },


}

export default userApi
