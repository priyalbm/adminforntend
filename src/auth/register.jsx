import React, { useState ,useEffect} from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice.js";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup"; 
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string().required("Name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const {user,isLoading,error,message,isAuthenticated }= useSelector((state)=>state.auth)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values) => {
    dispatch(registerUser(values));
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
                Have an account ? <Link to="/">Login</Link>
              </h4>
            </div>
            <div className="login_form">
              <img src="/images/logo.png" className="img-fluid" alt="" />
              <h4>Register your Account</h4>
              <Formik
                initialValues={{
                  email: "",
                  username: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div>
                      <label htmlFor="email" className="mb-2 text-white">
                        Email Address
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="input_box w-100"
                        placeholder="Enter Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="error-text"
                      />
                    </div>

                    <div className="login_spc">
                      <label htmlFor="username" className="mb-2 text-white">
                        Name
                      </label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className="input_box w-100"
                        placeholder="Enter Name"
                      />
                      <ErrorMessage
                        name="username"
                        component="p"
                        className="error-text"
                      />
                    </div>

                    <div className="login_spc">
                      <label htmlFor="password" className="mb-2 text-white">
                        Password
                      </label>
                      <div className="input_box d-flex align-items-center justify-content-between">
                        <Field
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          className="bg-transparent border-0 w-100"
                          placeholder="Enter Password"
                        />
                        <span
                          onClick={togglePasswordVisibility}
                          className="password-toggle"
                        >
                          {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                        </span>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="error-text"
                      />
                    </div>

                    <div className="login_spc">
                      <label htmlFor="confirmPassword" className="mb-2 text-white">
                        Confirm Password
                      </label>
                      <div className="input_box d-flex align-items-center justify-content-between">
                        <Field
                          type={showPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          className="bg-transparent border-0 w-100"
                          placeholder="Confirm Password"
                        />
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="p"
                        className="error-text"
                      />
                    </div>

                    <div className="form_btn text-center">
                      <button
                        type="submit"
                        className="cmn_btn text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? "Loading ..." : "Register your account"}
                      
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
