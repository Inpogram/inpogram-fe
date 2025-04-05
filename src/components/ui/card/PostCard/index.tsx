import {
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from '@material-tailwind/react'
import {
  renderPostStartDate,
  renderPropertiesForPostStatus
} from './PostCard.utils'
import { Post } from '../../../../types/types'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

type PostCardType = {
  post: Post
  isOtherPosts?: boolean
}

const DEFAULT_IMG_URL =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
const DEFAULT_ICON_URL = '/calendar-closed.png'

const PostCard: React.FC<PostCardType> = ({ post, isOtherPosts = false }) => {
  const {
    backgroundColor,
    calendarIcon,
    cardBorderTopColor,
    displayStatus,
    textColor,
    fontSize
  } = renderPropertiesForPostStatus(post.status)

  const cardHeaderBanner = (post: Post) =>
    (post && post.bannerUrl) ?? DEFAULT_IMG_URL

  const LinkWrapper = ({ isOtherPosts, to, className, children }) => {
    return isOtherPosts ? (
      <a href={to} className={className}>
        {children}
      </a>
    ) : (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <Card
      className={`aspect-[4/3]  max-h-[360px] w-full overflow-hidden border-[1px] border-t-4 ${cardBorderTopColor} shadow-sm`}
      style={{
        borderRadius: '4px',
        boxShadow:
          'rgba(23, 26, 31,0.2) 0px 0px 1px, rgba(23, 26, 31,0.2) 0px 0px 2px'
      }}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className={`h-[16rem] m-0 rounded-none pt-3 px-3 bg-[unset]`}
      >
        <LinkWrapper
          isOtherPosts={isOtherPosts}
          to={`/posts/${post.title}`}
          className=""
        >
          <img
            src={cardHeaderBanner(post)}
            alt="DEFAULT_IMG_URL"
            style={{ borderRadius: '3px' }}
            className="w-full h-full object-cover"
          />
        </LinkWrapper>
      </CardHeader>
      <CardBody className="sm:px-3 sm:py-5 py-2">
        <LinkWrapper
          isOtherPosts={isOtherPosts}
          to={`/posts/${post.title}`}
          className="font-bold sm:text-xl  text-lg lg:text-2xl"
        >
          {post.title}
        </LinkWrapper>
      </CardBody>
      <CardFooter className="p-3 flex items-center  justify-between border-t-[1px] text-post-footer">
        <div className="flex items-center gap-3">
          <div className="relative">
            <p
              style={{
                WebkitTextStroke: '0.7px black',
                transform: 'translate(-50%,-37%)'
              }}
              className={`absolute top-[50%] left-[50%] font-extrabold sm:${fontSize} text-sm ${textColor}`}
            >
              {moment(new Date(post.startDate)).date()}
            </p>
            <img
              src={calendarIcon || DEFAULT_ICON_URL}
              className="h-[24px] w-[24px]"
              alt="info-icon"
            />
          </div>
          <p className={`sm:${fontSize} text-sm text-left`}>
            {renderPostStartDate(new Date(post.startDate))}
          </p>
        </div>
        <div className="sm:flex gap-2 items-center hidden  ">
          <div
            className={`w-[14px] h-[14px] rounded-full ${backgroundColor}`}
          />
          <div className={`${textColor}  font-bold capitalize`}>
            {displayStatus}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostCard
