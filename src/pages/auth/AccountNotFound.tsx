import React from 'react'
import GoogleIcon from '../../components/ui/icon/GoogleIcon'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { getOAuth2AuthUrl } from '../../utils/authUtils'
import OAuthLoginButton from '../../components/auth/OAuthLoginButton'
import { PROVIDERS } from '../../auth/authService'
import { AuthFlow } from '../../auth/authSlice'

const AccountNotFound = () => {
  const location = useLocation()
  const user = useSelector((state: RootState) => state.auth.user)

  return user ? (
    <Navigate to="/posts" state={{ from: location }} replace />
  ) : (
    <div className="flex justify-center items-center mt-[30px]">
      <div className=" flex items-center justify-center flex-col w-[800px] h-[580px] bg-white shadow-2xl py-[44px] px-[56px]">
        <h1 className="text-[32px]">
          Sorry, we didn’t recognize that account.
        </h1>
        <p className="text-[14px] mt-[36px] mb-[36px]">
          Would you like to create a new Inpogram account?
        </p>
        <div className="h-[200px]">
          <OAuthLoginButton
            provider={PROVIDERS.GOOGLE}
            authFlow={AuthFlow.SIGNUP}
          />
          <a className="text-[14px] mb-[32px]" href="/signin">
            See all sign in options
          </a>
        </div>
      </div>
    </div>
  )
}

export default AccountNotFound
