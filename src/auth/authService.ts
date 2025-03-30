import { API_BASE_URL, ACCESS_TOKEN, OAUTH2_REDIRECT_URI } from '../constants'

export enum PROVIDERS {
  GOOGLE = 'google'
}

export enum AUTH_FLOWS {
  LOGIN = 'login',
  SIGNUP = 'signup'
}

export const ROLES = {
  User: 'USER',
  Member: 'MEMBER',
  Admin: 'ADMIN'
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

interface User {
  username: string
  email: string
  profileImageUrl: string
  role: Role
  [key: string]: any
}

interface AuthResponse {
  user: User
  token: string
}

export const redirectToBackendOAuth = (provider: string, authFlow: string) => {
  if (!Object.values(PROVIDERS).includes(provider as PROVIDERS)) {
    throw new Error(`Unsupported provider: ${provider}`)
  }
  if (!Object.values(AUTH_FLOWS).includes(authFlow as AUTH_FLOWS)) {
    throw new Error(`Unsupported authFlow: ${authFlow}`)
  }

  window.location.href = `${API_BASE_URL}/oauth2/authorize/${provider}?auth_flow=${authFlow}&redirect_uri=${encodeURIComponent(
    OAUTH2_REDIRECT_URI
  )}`
}

export const fetchUserData = async (): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
    method: 'GET',
    credentials: 'include'
  })
  if (!response.ok) throw new Error('Failed to fetch user data')
  const data: User = await response.json()
  return data
}

export const logoutUser = async (): Promise<void> => {
  await fetch(`${API_BASE_URL}/api/logout`, {
    method: 'POST',
    credentials: 'include'
  })
}

// TODO: implement email+password login flow
export const emailLogin = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' }
  })
  if (!response.ok) throw new Error('Email login failed')
  const data: AuthResponse = await response.json()
  localStorage.setItem(ACCESS_TOKEN, data.token)
  return data
}
