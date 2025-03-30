import React from 'react'
import GoogleIcon from '../../components/ui/icon/GoogleIcon'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { getOAuth2AuthUrl } from '../../utils/authUtils'
import OAuthLoginButton from '../../components/auth/OAuthLoginButton'
import { PROVIDERS } from '../../auth/authService'
import { AuthFlow } from '../../auth/authSlice'

const Signup = () => {
  const location = useLocation()
  const user = useSelector((state: RootState) => state.auth.user)

  return user ? (
    <Navigate to="/posts" state={{ from: location }} replace />
  ) : (
    <div className="flex justify-center items-center mt-[30px]">
      <div className=" flex items-center flex-col w-[600px] h-[625px] bg-white shadow-2xl py-[44px] px-[56px]">
        <h1 className="text-[32px]">Sign up</h1>
        <div className="h-[60px]"></div>
        <div className="h-[300px]">
          <OAuthLoginButton
            provider={PROVIDERS.GOOGLE}
            authFlow={AuthFlow.SIGNUP}
          />
          <p className="text-[14px] mb-[32px]">
            Already have an account?{' '}
            <a className="text-[#1A8917] font-bold" href="/signin">
              Sign in
            </a>
          </p>
          <p className="text-[14px]">
            Forgot email or trouble signing in? Get help.
          </p>
        </div>
        <p className="text-[13px]">
          Click “Sign Up” to agree to Inpogram’s Terms of Service and
          acknowledge that Inpogram’s Privacy Policy applies to you.
        </p>
      </div>
    </div>
  )
}

export default Signup
