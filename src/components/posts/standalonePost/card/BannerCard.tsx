import React from 'react'

type BannerCardType = {
  src: string
}

const BannerCard: React.FC<BannerCardType> = ({ src }) => {
  return (
    <div className="h-full">
      <img alt="" className="h-full w-full object-cover" src={src}></img>
    </div>
  )
}

export default BannerCard
