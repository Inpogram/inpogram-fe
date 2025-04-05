import React from 'react'
import { Post } from '../../../types/types'
import PostCard from '../../ui/card/PostCard'

type AllPostsGridType = {
  allPosts: Post[]
}

const AllPostsGrid: React.FC<AllPostsGridType> = ({ allPosts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {allPosts &&
        allPosts.length > 0 &&
        allPosts.map((post, i) => (
          <div key={i}>
            <PostCard post={post} />
          </div>
        ))}
    </div>
  )
}

export default AllPostsGrid
