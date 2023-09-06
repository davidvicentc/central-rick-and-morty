// Import Swiper React components
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';

export default () => {
    return (
        <Swiper
        pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
            slidesPerView={1}
            watchSlidesProgress
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide> <img className="img-slider" src="/assets/image/bg1.jpeg" /></SwiperSlide>
            <SwiperSlide><img className="img-slider" src="/assets/image/bg2.jpg" /></SwiperSlide>
            <SwiperSlide><img className="img-slider" src="/assets/image/bg3.jpg" /></SwiperSlide>
            {/* <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide> */}
        </Swiper>
    );
};