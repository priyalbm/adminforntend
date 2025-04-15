import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UserSlider from "./UserSlider";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from '../utils/refresh';


const listData = [
  {
    link: "/dashboard",
    tip: "Dashboard",
    img: "s1",
    head: "Dashboard",
    menu: "main_menu",
  },
  {
    link: "/user-management",
    tip: "User Management",
    img: "s2",
    head: "User Management",
    menu: "main_menu",
  },
  {
    link: "/bot-management",
    tip: "Bots Management",
    img: "s3",
    head: "Bots Management",
    menu: "main_menu",
  },
  {
    link: "/sub-payment",
    tip: "Subscription & Payment",
    img: "s4",
    head: "Subscription & Payment",
    menu: "main_menu",
  },
  {
    link: "/pricing-plan",
    tip: "Pricing & Plans",
    img: "s5",
    head: "Pricing & Plans",
    menu: "main_menu",
  },
  {
    link: "#",
    tip: "Logs & Reporting",
    img: "s6",
    head: "Logs & Reporting",
    menu: "main_menu",
    submenu: [
      {
        link: "/user-activity",
        tip: "User Activity Reports",
        head: "User Activity Reports",
      },
      {
        link: "/bot-execution",
        tip: "Bot Execution Logs",
        head: "Bot Execution Logs",
      },
      {
        link: "/admin-activity",
        tip: "Admin Activity Logs",
        head: "Admin Activity Logs",
      },
    ],
  },
  {
    link: "/notification",
    tip: "Notifications",
    img: "s7",
    head: "Notifications",
    menu: "main_menu",
  },
  {
    link: "/support",
    tip: "Support",
    img: "s8",
    head: "Support",
    menu: "main_menu",
  },
  {
    link: "#",
    tip: "Logout",
    img: "s9",
    head: "Logout",
    menu: "main_menu",
    modalID: "#exampleModal1",
  },
];

const Sidebarnew = ({ active, setActive }) => {
    const navigate = useNavigate(); 
    const {isAuthenticated }= useSelector((state)=>state.auth)
  

const getData = async () => {
  const res = await api.get('/api/some-protected-route/');
  console.log(res.data);
};


    useEffect(()=>{
      getData()
      if (!isAuthenticated) {
        navigate("/");
      }
    },[isAuthenticated])
  
  const { pathname } = useLocation();
  const launchPadPath =
    pathname == `/user-activity` ||
    pathname == `/bot-execution` ||
    pathname == `/admin-activity`;

  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(
    launchPadPath ? 5 : null
  );

  const toggleSubmenu = (index) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  useEffect(() => {
    if (launchPadPath) {
      setOpenSubmenuIndex(5);
    }
  }, []);

  return (
    <>
      <div className="text-center logo_img d-none d-sm-block">
        <Link to="#" className={`transition navbar-brand `}>
          <img src="/images/logo.png" alt="logo" className="full_logo" />
          <img src="/images/logo_icon.png" alt="logo" className="logo_icon" />
        </Link>
      </div>

      <div className="d-block d-sm-none">
        <div className="logo_img d-flex align-items-center gap-4 justify-content-between">
          <Link
            to="#"
            className={`transition navbar-brand 
            
            `}
            onClick={() => setActive(!active)}
          >
            <img src="/images/logo.png" alt="logo" />
          </Link>
          <button
            type="button"
            className="bg-transparent border-0 "
            onClick={() => setActive(!active)}
          >
            <i className="fa-solid fa-bars-staggered text-white"></i>
          </button>
        </div>
      </div>

      <div className="pt-3">
        <ul className="sidebar__list list-unstyled">
          {listData.map((data, i) => {
            const isSubmenuActive = data.submenu?.some(
              (d) => pathname === d.link
            );
            const isActive = pathname === data.link || isSubmenuActive;

            return (
              <React.Fragment key={i}>
                <li className={`${isActive ? "active" : ""}`}>
                  <div
                    className="d-flex align-items-center sub_btn justify-content-between"
                    onClick={() => toggleSubmenu(i)}
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="modal"
                    data-bs-target={data.modalID}
                  >
                    <div>
                      <Link
                        to={data.link}
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title={data.tip}
                      >
                        <img
                          src={`/images/icons/${data.img}.png`}
                          alt=""
                          className="img-fluid"
                        />
                        <span>{data.head}</span>
                      </Link>
                    </div>
                    {data.submenu && (
                      <button className="toggle-button">
                        {openSubmenuIndex === i ? "▼" : "▲"}
                      </button>
                    )}
                  </div>
                </li>
                {data.submenu && openSubmenuIndex === i && (
                  <ul className="list-unstyled submenu">
                    {data.submenu.map((d, ind) => (
                      <li
                        className={`${pathname === d.link ? "active" : ""}`}
                        key={ind}
                      >
                        <Link
                          to={d.link}
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          title={d.tip}
                        >
                          <i className="fa-solid fa-circle"></i>
                          <span>{d.head}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            );
          })}
        </ul>

        <div className="user_slider text-start">
          <UserSlider />
        </div>
      </div>
    </>
  );
};

export default Sidebarnew;
