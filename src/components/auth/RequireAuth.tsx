import { useLocation, Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Role } from '../../auth/authService'

interface RequireAuthProps {
  allowedRoles: Role[]
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  )

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export default RequireAuth
