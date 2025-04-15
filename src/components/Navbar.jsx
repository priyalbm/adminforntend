import React, { useState,useEffect } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { HiOutlineArrowRight } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile} from "../redux/authSlice"; 

const Navbarnew = ({ active, setActive }) => {
  const dispatch=useDispatch()
  const { user ,isAuthenticated }= useSelector((state)=>state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]);


  const notificationData = [
    {
      img: "n1",
      hdng: "Lorem ipsum.",
      desc: "Lorem ipsum dolor sit amet....",
      time: "5min ago",
      icon: "nh1",
    },
    {
      img: "n2",
      hdng: "Lorem ipsum.",
      desc: "Lorem ipsum dolor sit amet....",
      time: "5min ago",
      active: "active",
    },
    {
      img: "n1",
      hdng: "Lorem ipsum.",
      desc: "Lorem ipsum dolor sit amet....",
      time: "5min ago",
      icon: "nh2",
    },
  ];

  return (
    <header className="invest-header ">
      <div className="d-flex justify-content-between align-items-center text-white">
        <div className="">
          <button
            type="button"
            className="bg-transparent border-0 "
            onClick={() => setActive(!active)}
          >
            <i className="fa-solid fa-bars-staggered text-white"></i>
          </button>
        </div>
        <div className="d-flex align-items-center nav_right_data">
          <div className="dropdown notification_data position-relative">
            <Link
              to="#"
              className="position-relative "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <IoNotifications className="i_bell" />
              <span className="dot">18</span>
            </Link>

            {/* Notification Menu */}

            <div className="dropdown-menu dropdown-menu-end bell_dropdown">
              <div className="dropdown_header d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Notifications</h6>
                <div className="d-flex gap-2 align-items-center">
                  <span>15 New</span>
                  <FaEnvelopeOpenText />
                </div>
              </div>
              <div className="dropdown_content_parent">
                {notificationData.map((item, i) => (
                  <div
                    className={`content d-flex  justify-content-between ${ 
                      item?.active ? item?.active : ""
                    }`}
                    key={i}
                  >
                      <div className="d-flex align-items-start">
                      <img
                        src={`/images/${item?.img}.png`}
                        alt="avatar"
                        className="me-2 img-fluid notify_img"
                      />
                      <div className="">
                          <div className="d-flex align-items-center gap-1">
                            <h6 className="mb-0">{item?.hdng}</h6>
                            <img
                              src={`/images/${item?.icon}.png`}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                          <p>{item?.desc}</p>
                          <span>{item?.time}</span>
                        </div>
                      </div>
                    <div className="d-flex flex-column h-100 gap-4">
                      <GoDotFill className="dot_n" />
                      {item?.active && <RxCross2 className="cross" />}
                    </div>
                  </div>
                ))}
                <div className=" content_btn">
                  <Link
                    to="/all-notifications"
                    className="d-flex  w-100 justify-content-center align-items-center"
                  >
                    View All <HiOutlineArrowRight className="ms-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link to="/profile" className="d-flex align-items-center profile_data">
            <img src="/images/profile_pic.png" className="img-fluid" alt="" />
            <div>
              <h4 className="mb-0">{user?.username}</h4>
              <p className="mb-0">{user?.email}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbarnew;
