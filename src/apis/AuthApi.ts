import axios from 'axios'

const authApi = {
  verifyToken: () => {
    const url = '/api/v1/auth/verify-token'
    return axios.get(url)
  },
}

export default authApi
