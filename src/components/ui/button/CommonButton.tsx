import React from 'react'

type CommonButtonType = {
  type?: 'submit' | 'reset' | 'button' | undefined
  children?: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e?: any) => void
  buttonRef?: React.RefObject<HTMLButtonElement>
  disabled?: boolean
}

const CommonButton: React.FC<CommonButtonType> = ({
  children,
  startIcon,
  endIcon,
  className,
  onClick,
  buttonRef,
  disabled,
  type = 'button'
}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      ref={buttonRef}
      disabled={disabled}
    >
      {startIcon}
      <div>{children}</div>
      {endIcon}
    </button>
  )
}

export default CommonButton
