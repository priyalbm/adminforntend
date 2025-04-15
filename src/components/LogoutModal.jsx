import React, { useState,useEffect } from "react";
import {logoutUser} from "../redux/authSlice"
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const LogoutModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const {isLoading,error,message,isAuthenticated }= useSelector((state)=>state.auth)

  const handleLogout = () => {
   dispatch(logoutUser()); 
 };


  return (
    <>
 {/* Logout Modal   */}

     {/* Modal  */}

   <div className="logout_modal modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
      <ToastContainer />
      <div className="modal-dialog modal-dialog-centered">
         <div className="modal-content">
            <div className="modal-header p-0">
               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-0">
               <div className="text-center">
                  <img src="/images/logout.png" className="img-fluid" alt="" />
                  <h4 className="text-white">Are you sure you want to logout?</h4>
               </div>
            </div>
            <div className="modal-footer text-center justify-content-center p-0">
               <button type="button" onClick={handleLogout} className="cmn_btn" data-bs-dismiss="modal">Yes</button>
               <button type="button" className="cmn_btn gry_btn ">No</button>
            </div>
         </div>
      </div>
   </div>

   {/* Logout Modal   */}

    </>
  );
};

export default LogoutModal;









