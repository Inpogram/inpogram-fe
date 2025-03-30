import axios from 'axios'

const activityApi = {
  getPosts: (params) => {
    const url = '/api/v1/posts'
    return axios.get(url, { params })
  },

  getOtherRelevantPosts: (title: string | undefined) => {
    const url = `/api/v1/posts/${title}/closest-others`
    return axios.get(url)
  },

  addPost: (post: FormData) => {
    const url = '/api/v1/posts'
    return axios.post(url, post)
  },

  editPost: (id: string, post: FormData) => {
    const url = `/api/v1/posts/${id}`
    return axios.put(url, post)
  },

  getPostByTitle: (activityTitle: string) => {
    const url = `/api/v1/posts/${activityTitle}`
    return axios.get(url)
  },

  approvePost: (activityTitle: string) => {
    const url = `/api/v1/posts/${activityTitle}/approve`
    return axios.put(url)
  },

  rejectPost: (activityTitle: string, message: string) => {
    const url = `/api/v1/posts/${activityTitle}/reject`
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const data = {
      message: message
    }
    return axios.put(url, data, config)
  },

  registerPost: (activityTitle: string) => {
    const url = `/api/v1/posts/${activityTitle}/register`
    return axios.put(url)
  },

  unregisterPost: (activityTitle: string, message: string) => {
    const url = `/api/v1/posts/${activityTitle}/unregister`
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const data = {
      message: message
    }
    return axios.put(url, data, config)
  },

  unregisterUser: (activityTitle: string, userId: string) => {
    const url = `/api/v1/posts/${activityTitle}/unregister/${userId}`
    return axios.put(url)
  },

  getParticipantsByTitle: (activityTitle: string) => {
    const url = `/api/v1/posts/${activityTitle}/participants`
    return axios.get(url)
  },

  registerUser: (activityTitle: string, userId: string) => {
    const url = `/api/v1/posts/${activityTitle}/register/${userId}`
    return axios.put(url)
  }
}

export default activityApi
