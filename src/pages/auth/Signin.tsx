import React, { useEffect } from 'react'
import GoogleIcon from '../../components/ui/icon/GoogleIcon'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { getOAuth2AuthUrl } from '../../utils/authUtils'
import OAuthLoginButton from '../../components/auth/OAuthLoginButton'
import { PROVIDERS } from '../../auth/authService'
import { AuthFlow } from '../../auth/authSlice'

const Signin = () => {
  const { user, loading, error } = useSelector((state: RootState) => state.auth)
  const location = useLocation()

  return user ? (
    <Navigate to="/posts" state={{ from: location }} replace />
  ) : (
    <div className="flex justify-center items-center mt-[30px]">
      <div className=" flex items-center flex-col w-[600px] h-[625px] bg-white shadow-2xl py-[44px] px-[56px]">
        <h1 className="text-[32px]">Sign in</h1>
        <div className="h-[60px]"></div>
        <div className="h-[300px]">
          <OAuthLoginButton
            provider={PROVIDERS.GOOGLE}
            authFlow={AuthFlow.LOGIN}
          />
          <p className="text-[14px] mb-[32px]">
            No account?{' '}
            <a className="text-[#1A8917] font-bold" href="/signup">
              Create one
            </a>
          </p>
          <p className="text-[14px]">
            Forgot email or trouble signing in? Get help.
          </p>
        </div>
        <p className="text-[13px]">
          Click “Sign In” to agree to Inpogram’s Terms of Service and
          acknowledge that Inpogram’s Privacy Policy applies to you.
        </p>
      </div>
    </div>
  )
}

export default Signin
