import React from 'react'
import ThumbUpIcon from '../../../ui/icon/ThumbUpIcon'
import BookmarkIcon from '../../../ui/icon/BookmarkIcon'
import ShareIcon from '../../../ui/icon/ShareIcon'
import CommentIcon from '../../../ui/icon/CommentIcon'

const ReactionBar = () => {
  return (
    <div className="border-y-[1px] border-[#F2F2F2] mt-[36px] py-[3px] px-[8px]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <div className="flex flex-row w-[74px] items-center">
            <ThumbUpIcon
              className="w-[28px] h-[28px] mr-[4px]"
              color="#6B6B6B"
            />
            <button className="text-[13px] text-[#6B6B6B]">408</button>
          </div>
          <div className="flex flex-row">
            <button className="flex flex-row items-center">
              <CommentIcon
                className="w-[28px] h-[28px] mr-[4px]"
                color="#6B6B6B"
              />
              <p className="text-[13px] text-[#6B6B6B]">10</p>
            </button>
          </div>
        </div>
        <div className="flex flex-row">
          <BookmarkIcon
            className="w-[28px] h-[28px] mr-[24px]"
            color="#6B6B6B"
          />
          <ShareIcon className="w-[28px] h-[28px]" color="#6B6B6B" />
        </div>
      </div>
    </div>
  )
}

export default ReactionBar
