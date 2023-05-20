import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";
import { useCartContext } from "../context/cart_context";

import { UserContext } from "../App";

const Nav = () => {
  const { state, dispatch } = useContext(UserContext);
  const [menuIcon, setMenuIcon] = useState();
  const { total_item } = useCartContext();

  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li>
            <NavLink
              to="/"
              className="navbar_link home_link"
              onClick={() => setMenuIcon(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="navbar_link"
              onClick={() => setMenuIcon(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="navbar_link"
              onClick={() => setMenuIcon(false)}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="navbar_link"
              onClick={() => setMenuIcon(false)}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/previusorders" className="navbar_link">
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout" className="navbar_link">
              Logout
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="navbar_link cart_trolley_link">
              <FiShoppingCart className="cart_trolley" />
              <span className="cart_total_item">{total_item}</span>
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <NavLink
              to="/"
              className="navbar_link home_link"
              onClick={() => setMenuIcon(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="navbar_link"
              onClick={() => setMenuIcon(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="navbar_link"
              onClick={() => setMenuIcon(false)}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="navbar_link"
              onClick={() => setMenuIcon(false)}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/previusorders" className="navbar_link">
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="navbar_link">
              login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="navbar_link">
              Register
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="navbar_link cart_trolley_link">
              <FiShoppingCart className="cart_trolley" />
              <span className="cart_total_item">{total_item}</span>
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <Navbar>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar_lists">
          <RenderMenu />
          {/* <li>
            <NavLink to="/" className="navbar_link home_link"
             onClick={() => setMenuIcon(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="navbar_link"
             onClick={() => setMenuIcon(false)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className="navbar_link"
             onClick={() => setMenuIcon(false)}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="navbar_link"  onClick={() => setMenuIcon(false)}>
              Contact
            </NavLink>
          </li>

          <li>
            <NavLink to="/login" className="navbar_link">
              login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="navbar_link">
              Register
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout" className="navbar_link">
              Logout
            </NavLink>
          </li>
           <li>
            <NavLink to="/cart" className="navbar_link cart_trolley_link">
            <FiShoppingCart className="cart_trolley"/>
            <span className="cart_total_item">{}</span>
            </NavLink>
          </li> */}
        </ul>
        {/* button open or close on mobile screen*/}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </Navbar>
  );
};

const Navbar = styled.nav`
  .navbar_lists {
    display: flex;
    gap: 4.8rem;
    align-items: center;
    .navbar_link {
      &:link,
      &:visited {
        display: inline-block;
        text-decoration: none;
        font-size: 1.8rem;
        font-weight: 500;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.black};
        transition: color 0.3s linear;
      }
      &:hover,
      &:active {
        color: ${({ theme }) => theme.colors.helper};
      }
    }
  }
  .mobile-navbar-btn {
    display: none;
    background-color: transparent;
    cursor: pointer;
    border: none;
  }
  .mobile-nav-icon[name="close-outline"] {
    display: none;
  }
  .close-outline {
    display: none;
  }
  .cart_trolley_link {
    position: relative;
    .cart_trolley {
      position: relative;
      font-size: 3.2rem;
    }
    .cart_total_item {
      width: 2.4rem;
      height: 2.4rem;
      position: absolute;
      background-color: #000;
      color: #000;
      border-radius: 50%;
      display: grid;
      place-items: center;
      top: -20%;
      left: 70%;
      background-color: ${({ theme }) => theme.colors.helper};
    }
  }
  .user-login--name {
    text-transform: capitalize;
  }
  .user-logout,
  .user-login {
    font-size: 1.4rem;
    padding: 0.8rem 1.4rem;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .mobile-navbar-btn {
      display: inline-block;
      z-index: 9999;
      border: ${({ theme }) => theme.colors.black};
      .mobile-nav-icon {
        font-size: 4.2rem;
        color: ${({ theme }) => theme.colors.black};
      }
    }
    .active .mobile-nav-icon {
      display: none;
      font-size: 4.2rem;
      position: absolute;
      top: 30%;
      right: 10%;
      color: ${({ theme }) => theme.colors.black};
      z-index: 9999;
    }
    .active .close-outline {
      display: inline-block;
    }
    .navbar_lists {
      width: 100vw;
      height: 60vh;
      position: absolute;
      top: 45px;
      left: -360px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      visibility: hidden;
      opacity: 0;
      transform: translateX(100%);
      ${"" /* transform-origin: top;  */}
      transition: all 3s linear;
    }
    .active .navbar_lists {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
      z-index: 999;
      transform-origin: right;
      transition: all 3s linear;
      .navbar-link {
        font-size: 4.2rem;
      }
    }
    .cart_trolley_link {
      position: relative;
      .cart_trolley {
        position: relative;
        font-size: 5.2rem;
      }
      .cart_total_item {
        width: 4.2rem;
        height: 4.2rem;
        font-size: 2rem;
      }
    }
    .user-logout,
    .user-login {
      font-size: 2.2rem;
      padding: 0.8rem 1.4rem;
    }
  }
`;

export default Nav;
