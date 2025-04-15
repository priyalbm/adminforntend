import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default () => {
  const ecoData = [
    {
      img: "user_slide1",
      head: "Jenny Joe",
      para: "jennyjoe@gmail.com",
    },
    {
      img: "user_slide1",
      head: "Jenny Joe",
      para: "jennyjoe@gmail.com",
    },
    {
      img: "user_slide1",
      head: "Jenny Joe",
      para: "jennyjoe@gmail.com",
    },
    {
      img: "user_slide1",
      head: "Jenny Joe",
      para: "jennyjoe@gmail.com",
    },
    {
      img: "user_slide1",
      head: "Jenny Joe",
      para: "jennyjoe@gmail.com",
    },
  ];

  return (
    <Swiper
      className="top_spc"
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 2000, 
        disableOnInteraction: false,
      }}
      loop={true}
      breakpoints={{
        0: {
          slidesPerView: 1, 
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 25,
        },
        992: {
          slidesPerView: 1, 
          spaceBetween: 20,
        },
      }}
      onSwiper={(swiper) => null}
      onSlideChange={() => null}
    >
      {ecoData.map((data, i) => {
        return (
          <SwiperSlide key={i}>
            <h4 className="mb-0">New Users</h4>
              <div className="text-center">
                <img src={`/images/${data.img}.png`} className="img-fluid" alt="" />
                <h6 className="">{data.head}</h6>
                <p className="">{data.para}</p>
              </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
