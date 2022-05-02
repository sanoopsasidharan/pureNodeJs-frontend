import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../TextField/Textfield";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [ErrorMessage, setErrorMessage] = useState("");

  const Validate = Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 characters or less ")
      .required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(4, "password must be at least 4 characters ")
      .required("Password is required"),
    conFirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password is must match ")
      .required("ConFirmpassword required"),
    number: Yup.number()
      .min(10, "Number must be 10 characters ")
      .required("Number is required"),
  });

  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        number: "",
        password: "",
        conFirmPassword: "",
      }}
      validationSchema={Validate}
      onSubmit={(values) => {
        try {
          var formBody = [];
          for (var property in values) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(values[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");

          fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: formBody,
          })
            .then((response) => response.json())
            .then((responseData) => {
              console.log(JSON.stringify(responseData));
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {(formik) => (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 className="my-4 font-weight-bold .display-4">Register</h1>
          </div>
          <Form>
            <TextField label="Name" name="name" type="text" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="Number" name="number" type="number" />
            <TextField label="Password" name="password" type="password" />
            <TextField
              label="ConFirm password"
              name="conFirmPassword"
              type="password"
            />
            <div
              style={{
                color: "red",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p>{ErrorMessage}</p>
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
              <p>I have already account</p>
            </div>
            <button
              style={{ width: "100%" }}
              className="btn btn-dark mt-3"
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

export default Register;
