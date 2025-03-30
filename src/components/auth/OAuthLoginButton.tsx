import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthFlow, initiateOAuthLogin } from '../../auth/authSlice'
import { AppDispatch, RootState } from '../../redux/store'
import GoogleIcon from '../ui/icon/GoogleIcon'

interface OAuthLoginButtonProps {
  provider: string
  authFlow: AuthFlow
}

const OAuthLoginButton: React.FC<OAuthLoginButtonProps> = ({
  provider,
  authFlow
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const handleLogin = () => {
    dispatch(initiateOAuthLogin({ provider, authFlow }))
  }

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="flex flex-row justify-between m w-[300px] h-[40px] rounded-full border-[1px] border-[#242424] p-[8px] mb-[140px]"
    >
      <GoogleIcon className="w-[20px] h-[20px]" />
      <p className="text-[14px]">
        {loading
          ? 'Loading...'
          : `${
              authFlow === AuthFlow.LOGIN ? 'Sign in' : 'Sign up'
            } with ${provider}`}
      </p>
      <div className="w-[24px] h-[24px]"></div>
    </button>
  )
}

export default OAuthLoginButton
