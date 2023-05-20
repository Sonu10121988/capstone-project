import React, { useState } from "react";
import { NavLink} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import {
  MdAccountCircle,
  MdEmail,
  MdOutlineSlideshow,
  MdLock,
} from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa";


const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    //console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) =>{
   e.preventDefault();

   const {name, email, phone, work, password, cpassword} = user;
   const res = await fetch("/register",{
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      name, email, phone, work, password, cpassword
    })
   
   });
   const data = await res.json();
   if(data.error){
    window.alert("Please enter valid data");
    console.log("Invalid Registration");
   }else{
    window.alert("Registration Successfull");
    console.log("Registration Successfull");

    navigate("/login");
   }
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-image">
            <figure>
              <img
                src="https://img.freepik.com/premium-vector/internet-assistant-work_132971-57.jpg"
                alt="hero section pic"
                className="img-style"
              />
              <NavLink to="/login" className="signup-img-link">
                I am already register.
              </NavLink>
            </figure>
          </div>

          <div className="hero-section-data">
            <h2 style={{ textAlign: "center" }}>Sign up</h2>
            <form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="name">
                  <MdAccountCircle className="warranty-icon" />
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={user.name}
                  onChange={handleInputs}
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <MdEmail className="warranty-icon" />
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInputs}
                  placeholder="Your Email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  <FaPhoneVolume className="warranty-icon" />
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={user.phone}
                  onChange={handleInputs}
                  placeholder="Your Mobile No."
                />
              </div>

              <div className="form-group">
                <label htmlFor="work">
                  <MdOutlineSlideshow className="warranty-icon" />
                </label>
                <input
                  type="text"
                  name="work"
                  id="work"
                  autoComplete="off"
                  value={user.work}
                  onChange={handleInputs}
                  placeholder="Your Work"
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
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="Your Password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">
                  <MdLock className="warranty-icon" />
                </label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  autoComplete="off"
                  value={user.cpassword}
                  onChange={handleInputs}
                  placeholder="Your Confirm Password"
                />
              </div>
            </form>
            <div className="register-btn">
              <input type="submit" name="signup" id="signup" value="register" onClick={PostData}/>
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

export default Signup;
