import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/authSlice";
import { updateUsers } from "../redux/usersSlice";
import { ToastContainer, toast } from 'react-toastify';

export const ProfileSetting = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { isLoading,error,message, } = useSelector((state) => state.users);

  
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    email: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        phone_number: user.phone_number || "",
        email: user.email || "",
      });
    }
  }, [user]);

   useEffect(()=>{
      if(message){
        toast.success(message);
      }
      if(error){
        toast.error(error);
      }
    },[error,message])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedFields = {};

    if (formData.username !== user?.username) {
      updatedFields.username = formData.username;
    }
    if (formData.phone_number !== user?.phone_number) {
      updatedFields.phone_number = formData.phone_number;
    }
    if (formData.email !== user?.email) {
      updatedFields.email = formData.email;
    }

    if (Object.keys(updatedFields).length > 0) {
      dispatch(updateUsers({id:user?.id,updatedFields}));
    }
  };
  return (
    <DashboardLayout>
                <ToastContainer />
      
      <section className="plan profile">
        <div className="row">
          <div className="col-lg-12">
            <div className="count_box">
              <div className="dashboard_head d-flex align-items-center gap-2 pro_back">
                <Link to="/profile">
                  <IoArrowBackCircleOutline />
                </Link>
                <h5 className="mb-0">Profile Settings</h5>
              </div>
              <div className="row">
                <div className="col-xl-4 col-sm-6">
                  <div className="input_spc">
                    <label className="mb-2 text-white">Name</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="input_box w-100"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="mb-3 mb-sm-0">
                    <label className="mb-2 text-white">P  hone Number</label>
                    <input
                      type="number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="input_box w-100"
                      placeholder="Enter Phone Number"
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-sm-6">
                  <div className="input_spc">
                    <label className="mb-2 text-white">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input_box w-100"
                      placeholder="Enter Email Address"
                    />
                  </div>
                </div>
                <div className="add_btn">
                  <button className="cmn_btn" onClick={handleSave}>
                    {isLoading ? "Loading..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};
