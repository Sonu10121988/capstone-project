import React, { useState, useContext  } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdEmail, MdLock } from "react-icons/md";
import {UserContext} from "../App";

const Login = () => {
  const {state, dispatch} =  useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e)=>{
   e.preventDefault();

  const res = await fetch('/signin',{
    method:"POST",
    headers:{
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      email, 
      password
    })
  });
  const data = await res.json();
  if(data.error){
    window.alert("Please enter valid data");
  }else{
    dispatch({type: "USER", payload: true})
    window.alert("Login Successfull");
    navigate("/");
  }
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-image">
            <figure>
              <img
                src="https://img.freepik.com/premium-vector/business-woman-work-laptop-office-desk-concept-with-icons-related_197170-171.jpg?w=2000"
                alt="hero section pic"
                className="img-style"
              />
              <NavLink to="/signup" className="signup-img-link">
                Create an Account
              </NavLink>
            </figure>
          </div>

          <div className="hero-section-data">
            <h2 style={{ textAlign: "center" }}>Log in</h2>
            <form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="email">
                  <MdEmail className="warranty-icon" />
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <MdLock className="warranty-icon" />
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your Password"
                />
              </div>
            </form>
            <div className="register-btn">
              <input type="submit" name="signin" id="signin" value="Log In" onClick={loginUser}/>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 3rem 0;
  img {
    min-width: 10rem;
    height: 10rem;
  }
  .hero-section-data {
    margin: 4rem 0;
    h2 {
      font-weight: bold;
    }
  }
  .form-group > input {
    width: 100%;
    margin-bottom: 1rem;
  }
  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .signup-img-link {
    color: black;
    font-size: 20px;
    margin-left: 10rem;
    font-weight: bold;
  }

  .img-style {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }
  .warranty-icon {
    width: 3.5rem;
    height: 3.5rem;
    padding-top: 10px;
  }
  .register-btn {
    margin-top: 1rem;
    margin-left: 10rem;
  }
  .register-btn:hover {
    transform: scale(0.96);
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 0.5rem;
    }
  }
`;

export default Login;
