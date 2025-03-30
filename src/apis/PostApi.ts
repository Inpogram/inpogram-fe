import axios from 'axios'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const postApi = {
  addPost: (post: FormData) => {
    const axiosPrivate = useAxiosPrivate()
    const url = '/api/v1/posts'
    return axiosPrivate.post(url, post)
  },
  getPostByTitle: (postTitle: string) => {
    const axiosPrivate = useAxiosPrivate()
    const url = `/api/v1/posts/${postTitle}`
    return axiosPrivate.get(url)
  }
}

export default postApi
