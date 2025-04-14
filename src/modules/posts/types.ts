import { User } from '../../types/types'

export interface PostFormData {
  title: string
  content: string
  availableTags: string[]
  tags: string[]
  featuredImage: File | null
  featuredImageName: string
}

export interface PostFormProps {
  initialValues?: Partial<PostFormData>
}

export interface Tag {
  id: string
  name: string
  usageCount: number
}

////////////////////////////////////////////////
export interface SubPost {
  subPostTitle: string
  subPostDescription: string
  subPostStartDate: string
  subPostStartTime: string
  subPostEndDate: string
  subPostEndTime: string
}

export interface Post {
  id: string
  title: string
  bannerImageName: string
  content: string
  tags: Tag[]
  creator: User
}

export interface PostFormats {
  id: string
  name: string
}
