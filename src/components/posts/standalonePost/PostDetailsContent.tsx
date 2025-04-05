import React from 'react'

const PostDetailsContent = () => {
  return (
    <div className="text-left mt-[40px]">
      <div
        dangerouslySetInnerHTML={{
          __html: 'abc'
        }}
      />
    </div>
  )
}

export default PostDetailsContent
