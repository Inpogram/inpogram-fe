import { Link } from 'react-router-dom'
import React from 'react'

type LinkButtonType = {
  className: string
  to: string
  title?: string
  icon?: React.ReactNode
}

const LinkButton: React.FC<LinkButtonType> = ({
  title,
  className,
  to,
  icon,
}) => {
  return (
    <Link className={className} to={to}>
      {icon}
      {title}
    </Link>
  )
}

export default LinkButton
