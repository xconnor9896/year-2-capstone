import React, { useState, useEffect } from "react";

import axios from 'axios';

import {baseURL} from "../pages/util/authUser";
const EmailVefPage = () => {
  const [inputEmail, setEmail] = useState("");
  const handleChange = async (e) => {
    const { value } = e.target;

    setEmail(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    axios
    .post(`/api/v1/email/verf`,{
      inputEmail : inputEmail
    })
    .then(response => {
      if(response.data != null){
        alert("The email has been sent go and check your spam")

      }else{
        alert("Sorry Something has gone wrong make sure you put in the right email")
      }
    })


  }

  return (
    <>
      <div>
        <h1>Put your email in so that we can send you a email to Verfiy it</h1>
        <h4>Make Sure to Check Your Spam</h4>
        <form onSubmit={handleSubmit}>
          <input type="text"  placeholder= "email" value={inputEmail} onChange={handleChange} style={{background: "black"}} />
          <button type="submit">
            Verfiy Your Email
          </button>
        </form>
      </div>
    </>
  );
};
export default EmailVefPage;
