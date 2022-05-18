import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

let baseURL = "http://localhost:3000";
// let navigate = useNavigate();

const changePassword = () => {
  const [inputEmail, setEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangeEmail = async (e) => {
    const { value } = e.target;

    setEmail(value);
  };
  const handleChangePass = async (e) => {
    const { value } = e.target;

    setInputPassword(value);
  };
  const handleChangeConfirm = async (e) => {
    const { value } = e.target;

    setConfirmPassword(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${baseURL}/api/v1/email/v2`, {
        inputEmail: inputEmail,
        inputPassword: inputPassword,
        confirmPassword: confirmPassword,
      })
      .then((response) => {
        if (response.data != null) {
          // alert("Your Passsword Has Been Changed :)");
          window.location = "/"
        } else {
          alert(
            "Sorry Something has gone wrong make sure you put in the right email"
          );
        }
      });
  };

  return (
    <>
      <div>
        <h1>Put your email in so that we can send you a email to Verfiy it</h1>
        <h4>Make Sure to Check Your Spam</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={inputEmail}
            onChange={handleChangeEmail}
            style={{ background: "black" }}
          />
          <input
            type="password"
            placeholder="New Password"
            value={inputPassword}
            onChange={handleChangePass}
            style={{ background: "black" }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChangeConfirm}
            style={{ background: "black" }}
          />
          <button type="submit">Change Your Password</button>
        </form>
      </div>
    </>
  );
};
export default changePassword;
