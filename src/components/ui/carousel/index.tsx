import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import PostCard from '../card/PostCard'
import { IPost } from '../../../shared/interfaces'
import React from 'react'

type CustomCarouselProps = {
  data: IPost[]
  isOtherPosts?: boolean
}

const CustomCarousel = ({ data }: CustomCarouselProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const CustomPrevArrow = ({ currentSlide, slideCount, ...props }: any) => (
    <button {...props} className="slick-arrow slick-prev">
      <img src="/carousel-arrow-left.png" alt="carousel-arrow-left" />
    </button>
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const CustomNextArrow = ({ currentSlide, slideCount, ...props }: any) => (
    <button {...props} className="slick-arrow slick-next">
      <img src="/carousel-arrow-right.png" alt="carousel-arrow-right" />
    </button>
  )

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    initialSlide: 0
  }

  return (
    <Slider
      responsive={[
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2
          }
        }
      ]}
      {...settings}
    >
      {data &&
        data.length > 0 &&
        data.map((post: IPost) => (
          <div className="px-4 flex justify-center" key={post.id}>
            <PostCard key={post.id} post={post} isOtherPosts />
          </div>
        ))}
    </Slider>
  )
}

export default CustomCarousel
