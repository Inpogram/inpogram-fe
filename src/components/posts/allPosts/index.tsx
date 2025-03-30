import React from 'react'
import AllPostsHeader from './AllPostsHeader'
import AllPostsGrid from './AllPostsGrid'
import { IPost } from '../../../shared/interfaces'
import AllPostsCarousel from './AllPostsCarousel'
import Loading from '../../ui/Loading'

type AllPostsType = {
  loading: boolean
  allPosts: IPost[]
}

const AllPosts: React.FC<AllPostsType> = ({ loading, allPosts }) => {
  return (
    <>
      <AllPostsCarousel />
      <div className="container mx-auto">
        <AllPostsHeader />
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        ) : (
          <AllPostsGrid allPosts={allPosts} />
        )}
      </div>
    </>
  )
}

export default AllPosts
