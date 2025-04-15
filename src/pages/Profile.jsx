import React, { useState,useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { BiSolidEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile} from "../redux/authSlice"; 
import { format } from "date-fns";

export const Profile = () => {
    const dispatch=useDispatch()
    const { user ,isAuthenticated }= useSelector((state)=>state.auth)
  
    useEffect(() => {
      if (isAuthenticated) {
        dispatch(fetchUserProfile());
      }
    }, [dispatch, isAuthenticated]);
  return (
    <>
      <DashboardLayout>
        <section className="profile">
          <div className="row">
            <div className="dashboard_head">
              <h5 className="mb-0">Profile Settings</h5>
            </div>
            <div className="col-xxl-5 col-xl-6 col-md-8 col-sm-10">
              <div className="count_box profile_data">
                <img src="/images/users.png" className="img-fluid" alt="" />
                <div className="d-flex align-items-center gap-3 pro_head">
                  <h6>Basic Details</h6>
                  <Link to="/profile-setting">
                    <BiSolidEditAlt />
                  </Link>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div className="pro_spc">
                      <span>Username:</span>
                      <p>{user?.username}</p>
                    </div>
                    <div>
                      <span>Phone Number:</span>
                      <p>{user?.phone_number || "NA"}</p>
                    </div>
                  </div>
                  <div>
                    <div className="pro_spc">
                      <span>Email ID:</span>
                      <p>{user?.email}</p>
                    </div>
                    <div>
                      <span>Joining date:</span>
                      <p>{format(new Date(user?.date_joined), 'yyyy-MM-dd HH:mm:ss')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </DashboardLayout>
    </>
  );
};
