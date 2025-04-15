import React from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const Reset = () => {
  return (
    <>
      <section className="login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-8 col-xl-7 col-lg-6"></div>
            <div className="col-xxl-4 col-xl-5 col-sm-10 col-md-8 col-lg-6">
              <div className="login_top">
                <h4>
                  Not have an account ? <Link to="/register">Signup Now</Link>
                </h4>
              </div>
              <div className="login_form">
                <img src="/images/logo.png" className="img-fluid" alt="" />
                <h4 className="">Reset Password</h4>
                <form action="">
                  <div className="">
                    <label htmlFor="" className="mb-2 text-white">
                    New Password
                    </label>
                    <div className="input_box d-flex align-items-center justify-content-between">
                      <input
                        type="password"
                        className=" bg-transparent border-0 w-100"
                        placeholder="Enter New Password"
                      />
                      <IoEyeOffOutline />
                      <IoEyeOutline className="d-none" />
                    </div>
                  </div>
                  <div className="login_spc">
                    <label htmlFor="" className="mb-2 text-white">
                      Confirm Password
                    </label>
                    <div className="input_box d-flex align-items-center justify-content-between">
                      <input
                        type="password"
                        className=" bg-transparent border-0 w-100"
                        placeholder="Confirm Password"
                      />
                      <IoEyeOffOutline />
                      <IoEyeOutline className="d-none" />
                    </div>
                  </div>
                  <div className="form_btn text-center">
                    <Link to="#" className="cmn_btn text-white">
                    Reset Password
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
