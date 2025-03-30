import axios from 'axios'

const postTagApi = {
  getPostTags: () => {
    const url = '/api/v1/tags'
    return axios.get(url)
  },
}

export default postTagApi
