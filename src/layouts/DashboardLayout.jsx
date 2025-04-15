import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import LogoutModal from "../components/LogoutModal";

const DashboardLayout = ({ children }) => {
  const [active, setActive] = useState(false);
  const [hoverShow, setHoverShow] = useState(false);

  useEffect(() => {
    const updateActiveState = () => {
      if (window.innerWidth < 992) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    updateActiveState();
    window.addEventListener("resize", updateActiveState);
    return () => {
      window.removeEventListener("resize", updateActiveState);
    };
  }, []);

  return (
    <div>
      <section className="Layout_sec p-0">
        <div className="cus_container">
          <div className="dashboard">
            <div
              className={`sidebar ${hoverShow ? "active" : ""} ${
                active ? "active" : ""
              }`}
              onMouseEnter={() => (active ? setHoverShow(true) : {})}
              onMouseLeave={() => (active ? setHoverShow(false) : {})}
            >
              <Sidebar setActive={setActive} active={active} />
            </div>

            <div
              className={`main_box ${hoverShow ? "active" : ""} ${
                active ? "active" : ""
              }`}
            >
              <div className="layout-navbar">
                <Navbar setActive={setActive} active={active} />
              </div>
              <main className=" ">{children}</main>
            </div>
          </div>
        </div>
      </section>
      <LogoutModal />
    </div>
  );
};

export default DashboardLayout;
