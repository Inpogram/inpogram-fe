import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import activityApi from '../../../apis/PostApi'
import CustomCarousel from '../../ui/carousel'
import { IPost } from '../../../shared/interfaces'

const PostDetailsFooter = () => {
  const [otherRelavantPosts, setOtherRelavantPosts] = useState<IPost[]>([])

  const { activityTitle } = useParams()

  useEffect(() => {
    activityApi.getOtherRelevantPosts(activityTitle).then((response) => {
      const approvedPosts = response.data.filter(
        (post: { status: string }) =>
          post.status.toLowerCase() === 'open' ||
          post.status.toLowerCase() === 'closed'
      )
      setOtherRelavantPosts(approvedPosts)
    })
  }, [activityTitle])

  return (
    <div className="container mx-auto my-6 flex flex-col gap-6">
      <div className="uppercase text-xl font-bold">Other posts</div>

      <CustomCarousel data={otherRelavantPosts} isOtherPosts={true} />
    </div>
  )
}

export default PostDetailsFooter
