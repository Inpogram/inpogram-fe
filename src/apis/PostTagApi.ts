import { API_BASE_URL } from '../constants'
import { Tag } from '../modules/posts/types'

export const getAvailableTags = async (): Promise<Tag[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/tags`, {
    method: 'GET',
    credentials: 'include'
  })
  if (!response.ok) throw new Error('Failed to fetch user data')
  const data: Tag[] = await response.json()
  return data
}
