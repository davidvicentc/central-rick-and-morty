// Import Swiper React components
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles

import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export default () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
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