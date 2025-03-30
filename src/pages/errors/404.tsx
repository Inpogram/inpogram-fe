import React from 'react'

type NotFoundType = {
  message: string
}

const NotFound: React.FC<NotFoundType> = ({ message }) => {
  return (
    <div className="container mx-auto px-[24px]">
      <h1 className="text-left text-4xl mb-4 mt-4 text-[#242424] font-semibold">
        Oops! That page can’t be found.
      </h1>
      <p className="text-left text-xl">{message}</p>
    </div>
  )
}

export default NotFound
