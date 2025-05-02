import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentUsers } from "../redux/dashboardSlice";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default () => {
  const dispatch = useDispatch();
  const { recentusers } = useSelector((state) => state.dashboard);
  
  useEffect(() => {
    dispatch(fetchRecentUsers());
  }, [dispatch]);

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
      {recentusers?.map((data, i) => {
        return (
          <SwiperSlide key={i}>
            <h4 className="mb-0">New Users</h4>
            <div className="text-center">
              <img
                src={`/images/user_slide1.png`}
                className="img-fluid"
                alt=""
              />
              <h6 className="">{data.username}</h6>
              <p className="">{data.email}</p>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
