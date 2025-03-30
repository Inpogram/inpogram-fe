import { useEffect } from 'react'
import { axiosPrivate } from '../lib/axios'
import useRefreshToken from './useRefreshToken'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Cookies from 'js-cookie'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        const token = Cookies.get('authToken')
        if (!config.headers['Authorization'] && token) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [refresh])

  return axiosPrivate
}

export default useAxiosPrivate
