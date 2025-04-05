export interface User {
  isActivated: boolean
  fullName: string
  fullNameLastName: string
  avatar: string
  projectName: string
  email: string
  employeeCode: string
  id: string
  role: 'ROLE_USER' | 'ROLE_MEMBER' | 'ROLE_ADMIN'
}
