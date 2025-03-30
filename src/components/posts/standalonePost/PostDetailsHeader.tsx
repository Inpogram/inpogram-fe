import React from 'react'
import BannerCard from './card/BannerCard'
import { useAppSelector } from '../../../hooks'
import { postDetailsSelector } from '../../../redux/selectors'
import ReactionBar from './bar/ReactionBar'

const PostDetailsHeader = () => {
  const { initialPost } = useAppSelector(postDetailsSelector)
  const { title } = initialPost.data
  return (
    <div>
      <h1 className="text-[40px] mt-[1.19em] mb-[32px]">{title}</h1>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2">
          <div className="w-[40px] h-[40px] bg-slate-500 rounded-full"></div>
          <div>
            <div className="flex">
              <div>Lal Verma</div>
              <div className="mx-[10px]">-</div>
              <div>Follow</div>
            </div>
            <div className="flex text-[13px]">
              <div>9 min read</div>
              <div className="mx-[10px]">-</div>
              <div>Sep 11, 2020</div>
            </div>
          </div>
        </div>
        <ReactionBar />
      </div>
    </div>
  )
}

export default PostDetailsHeader
