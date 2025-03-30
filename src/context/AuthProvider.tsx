import React from 'react'
import { createContext, useState } from 'react'

type Authenticated = {
  user: any
  role: number
  accessToken: string
}

interface IAuthContext {
  authenticated: Authenticated
  setAuthenticated: React.Dispatch<React.SetStateAction<Authenticated>>
}

const initialValue = {
  authenticated: {
    user: null,
    role: 2,
    accessToken: ''
  },
  setAuthenticated: () => {}
}

const AuthContext = createContext<IAuthContext>(initialValue as IAuthContext)

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(initialValue.authenticated)

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
