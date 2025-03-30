import React from 'react'

type PenIconType = {
  color: string
  className?: string
}

const PenIcon: React.FC<PenIconType> = ({ color, className }) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="20" width="20" height="5" rx="2.5" stroke={color} />
      <path
        d="M5.90949 13.8642L10 20H20L24.0905 13.8642C24.5259 13.2112 24.7436 12.8847 24.7083 12.5289C24.6731 12.1731 24.3956 11.8956 23.8406 11.3406L15 2.5L6.15938 11.3406C5.60439 11.8956 5.32689 12.1731 5.29166 12.5289C5.25643 12.8847 5.47412 13.2112 5.90949 13.8642Z"
        stroke={color}
      />
      <circle cx="15" cy="13.75" r="3.25" stroke={color} />
      <path d="M15 2.5V11.25" stroke={color} />
    </svg>
  )
}

export default PenIcon
