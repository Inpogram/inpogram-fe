export interface ISubPost {
  subPostTitle: string
  subPostDescription: string
  subPostStartDate: string
  subPostStartTime: string
  subPostEndDate: string
  subPostEndTime: string
}

export interface ITag {
  id: string
  name: string
}

export interface IPost {
  id: string
  title: string
  bannerImageName: string
  content: string
  tags: ITag[]
  creator: IUser
}

export interface IUser {
  isActivated: boolean
  fullName: string
  fullNameLastName: string
  avatar: string
  projectName: string
  email: string
  employeeCode: string
  id: string
  role: 'ROLE_USER' | 'ROLE_ADMIN'

  // participatedPosts: string[] | null
}

export interface IPostFormats {
  id: string
  name: string
}
