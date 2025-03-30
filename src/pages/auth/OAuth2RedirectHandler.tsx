import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { handleAuthCallback } from '../../auth/authSlice'

const OAuth2RedirectHandler = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const hasProcessed = useRef(false)

  useEffect(() => {
    if (!hasProcessed.current) {
      hasProcessed.current = true

      dispatch(handleAuthCallback())
        .then((result) => {
          if (result.meta.requestStatus === 'fulfilled') {
            navigate('/posts', { replace: true }) // Redirect to a protected route on success
          } else {
            navigate('/unauthorized', { replace: true }) // Redirect on failure
          }
        })
        .catch((error) => {
          navigate('/', { replace: true }) // Error: redirect to landing
        })
    }
  }, [dispatch, navigate])

  return <div>Processing authentication...</div>
}

export default OAuth2RedirectHandler
