import React, { memo, useState } from 'react'

type UserIconType = {
  color: string
  className?: string
  profileImageUrl?: string
}

const UserIcon: React.FC<UserIconType> = ({
  color,
  className,
  profileImageUrl
}) => {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <>
      {profileImageUrl && !imageFailed && (
        <img
          src={profileImageUrl}
          alt="User profile"
          className={className}
          onError={(e) => {
            console.error('Image load failed:', profileImageUrl, { e })
            setImageFailed(true) // Fall back to SVG on 429 or other errors
          }}
          onLoad={() => setImageFailed(false)}
        />
      )}
      {(!profileImageUrl || imageFailed) && (
        <svg
          className={className}
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25"
            cy="20.833"
            r="6.25"
            stroke={color}
            stroke-linecap="round"
          />
          <circle cx="25" cy="25" r="18.75" stroke={color} />
          <path
            d="M37.5 38.9706C36.7627 36.7557 35.138 34.7985 32.878 33.4026C30.6179 32.0066 27.8487 31.25 25 31.25C22.1513 31.25 19.3821 32.0066 17.1221 33.4026C14.862 34.7985 13.2373 36.7557 12.5 38.9706"
            stroke={color}
            stroke-linecap="round"
          />
        </svg>
      )}
    </>
  )
}

export default memo(UserIcon)
