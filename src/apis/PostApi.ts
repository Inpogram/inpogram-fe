import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { API_BASE_URL } from '../constants'

export const addPost = async (post: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/posts`, {
    method: 'POST',
    credentials: 'include',
    body: post
  })

  if (!response.ok) throw new Error('Failed to create post')
  const data: any = await response.json()
  console.log({ data })

  return data
}
export const getPostByTitle = (postTitle: string) => {
  const axiosPrivate = useAxiosPrivate()
  const url = `/api/v1/posts/${postTitle}`
  return axiosPrivate.get(url)
}
