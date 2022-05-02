import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../TextField/Textfield";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const Validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(4, "password must be at least 4 characters ")
      .required("Password is required"),
  });

  const handleNavigate = () => {
    navigate("/register");
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Validate}
      onSubmit={(values) => {
        setErrorMessage("");
        var formBody = [];
        for (var property in values) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(values[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch("http://localhost:5000/login", {
          mode: "no-cors",
          // credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Accept: "application/json",
            Origin: "http://localhost:5000",
          },

          body: formBody,
        })
          .then((response) => response.json())
          .then((responseData) => {
            console.log("this is log");
            console.log(JSON.stringify(responseData));
          })
          .catch((err) => {
            console.log("this is error");
            console.log(err);
          });
      }}
    >
      {(formik) => (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 className="my-4 font-weight-bold .display-4">Login</h1>
          </div>
          <Form>
            <TextField label="Email" name="email" type="email" />
            <TextField label="Password" name="password" type="password" />
            <div
              style={{
                color: "red",
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <p>{errorMessage}</p>
            </div>
            <div
              onClick={handleNavigate}
              style={{
                color: "black",
                display: "flex",
                justifyContent: "end",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              <p>Create an account</p>
            </div>
            <button
              style={{ width: "100%" }}
              className="btn btn-dark"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Login;
