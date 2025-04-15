import React, { useState,useEffect } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../redux/authSlice"; // Assuming you have a login action in your authSlice
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const {isLoading,error,message,isAuthenticated }= useSelector((state)=>state.auth)
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = (values) => {
    dispatch(loginUser(values)); 
  };

  useEffect(()=>{
    if (isAuthenticated) {
      navigate("/dashboard");
    }
    if(message){
      toast.success(message);
    }
    if(error){
      toast.error(error);
    }
  },[error,message,isAuthenticated, navigate])

  return (
    <section className="login">
          <ToastContainer />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-7 col-lg-6"></div>
          <div className="col-xxl-4 col-xl-5 col-sm-10 col-md-8 col-lg-6">
            <div className="login_top">
              <h4>
                Don't have an account? <Link to="/register">Signup Now</Link>
              </h4>
            </div>
            <div className="login_form">
              <img src="/images/logo.png" className="img-fluid" alt="" />
              <h4>Login to Your Account</h4>

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <div>
                      <label htmlFor="email" className="mb-2 text-white">
                        Email Address
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="input_box w-100"
                        placeholder="Enter Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="login_spc">
                      <label htmlFor="password" className="mb-2 text-white">
                        Password
                      </label>
                      <div className="input_box d-flex align-items-center justify-content-between">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="bg-transparent border-0 w-100"
                          placeholder="Enter Password"
                        />
                        <span onClick={togglePasswordVisibility}>
                          {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                        </span>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                      <div className="text-end mt-1">
                        <Link to="/forgot" className="">
                          Forgot Password
                        </Link>
                      </div>
                    </div>

                    {error && <div className="text-danger">{message}</div>}

                    <div className="form_btn text-center">
                      <button type="submit" className="cmn_btn text-white">
                        {isLoading ? "Logging in..." : "Login To Your Account"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
