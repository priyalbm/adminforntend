import React from "react";
import { Link } from "react-router-dom";

export const Forgot = () => {
  return (
    <>
      <section className="login">
        <div className="container">

          <div className="row justify-content-center">
            <div className="col-xxl-8 col-xl-7 col-lg-6"></div>
            <div className="col-xxl-4 col-xl-5 col-sm-10 col-md-8 col-lg-6">
              <div className="login_top">
                <h4>Not have an account ? <Link to="/register">Signup Now</Link></h4>
              </div>
              <div className="login_form">
                <img src="/images/logo.png" className="img-fluid" alt="" />
                <h4 className="">
                Enter Email Address
                </h4>
                <form action="">
                  <div>
                    <label htmlFor="" className="mb-2 text-white">
                    Email Address
                    </label>
                    <input
                      type="email"
                      className="input_box w-100"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="form_btn text-center">
                    <Link to="/otp" className="cmn_btn text-white">Send OTP</Link>
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
