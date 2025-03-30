import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const data = [
  { image: '/images/banner-1.jpg', link: '#' },
  { image: '/images/banner-2.png', link: '#' },
  { image: '/images/banner-3.png', link: '#' }
]

const AllPostsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (prev, next) => {
      setCurrentSlide(next)
    },
    appendDots: (dots) => (
      <div>
        <ul>
          {dots.map((item, index) => {
            return (
              <li style={{ margin: '0 1px' }} key={index}>
                {item.props.children}
              </li>
            )
          })}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`w-[13px] h-[13px] rounded-full ${
          i === currentSlide ? 'bg-[#4B7BEC]' : 'bg-[#DEE1E6]'
        }`}
      />
    )
  }

  return (
    <Slider {...settings}>
      {data &&
        data.length > 0 &&
        data.map((item, index) => (
          <div className="h-full mb-2" key={index}>
            <img
              className="object-cover w-full h-[450px]"
              src={item.image}
              alt=""
            />
          </div>
        ))}
    </Slider>
  )
}

export default AllPostsCarousel
