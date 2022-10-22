import React, { useState } from "react";
import "../css/Login.css";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { env } from "./config";
import load from "../loading2.svg";

function Login() {
  let navigate = useNavigate();
  let [loading, setloading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (values.email.length === 0) {
        errors.email = "Enter your email address";
      } else if (values.email.search(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        errors.email = "Please provide a valid email address";
      }
      if (values.password.length === 0) {
        errors.password = "Enter your password";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setloading(true)
        let user = await axios.post(`${env.api}/login`, values);
        console.log(user);
        if (user.data.statusCode === 201) {
          setloading(false)
          window.localStorage.setItem("Token", user.data.token);
          window.localStorage.setItem("name", user.data.user.name);
          toast.success(user.data.message);
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        }

        if (user.data.statusCode === 401) {
          setloading(false)
          toast.warn(user.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <div className="containers">
        <form
          className="form"
          onSubmit={(values) => {
            formik.handleSubmit(values);
          }}
        >
          <h4 className="login_hed">Login</h4>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              UserName
            </label>
            <input
              type="email"
              className="form-control shadow-none"
              id="exampleInputEmail1"
              placeholder="Enter your Email Id"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error"> {formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label ">
              Password
            </label>
            <input
              type="password"
              className="form-control shadow-none"
              id="exampleInputPassword1"
              placeholder="Enter you Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error"> {formik.errors.password}</div>
            ) : null}
          </div>
          <div className=" forgot ">
            <span onClick={() => navigate("forgot-password")}>
              Forgot Password ?
            </span>
          </div>

          <button type="submit" className="btn" disabled={!formik.isValid}>
          {loading ? (
              <img
                src={load}
                alt="load"
                className="spinner"
                
              />
            ) : "Login"}
            
          </button>
          <div className="mt-3 new_user">
            <span>
              Dont't have an account?{" "}
              <span
                className="sign_color"
                onClick={() => navigate("/register")}
              >
                Sign up now
              </span>
            </span>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
