import React, { ReactNode, useEffect, useRef } from 'react'

type CommonPopupType = {
  children: ReactNode
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CommonPopup: React.FC<CommonPopupType> = ({
  children,
  isOpen,
  setIsOpen,
}) => {
  const popupRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 whitespace-pre-line">
          <div ref={popupRef}>{children}</div>
        </div>
      )}
    </>
  )
}

export default CommonPopup
