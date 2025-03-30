import React from 'react'

type IconButtonType = {
  src: string
  alt: string
  className?: string
}

const IconButton: React.FC<IconButtonType> = ({ src, alt, className }) => {
  return (
    <div className={className}>
      <img src={src} alt={alt} />
    </div>
  )
}

export default IconButton
