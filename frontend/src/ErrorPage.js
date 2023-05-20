import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./styles/Button";

function ErrorPage() {
  return (
    <Wrapper>
      <div className="container">
        <div>
          <h2>404</h2>
          <h3>oops!! Page Not Found</h3>
          <p>This page you are looking for does not exist.</p>
          <NavLink to='/'>
            <Button>go back</Button>
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
    text-align: center;
    h2 {
      font-size: 10rem;
    }
    p {
      margin: 2rem 0;
    }
    h3 {
      font-size: 4.2rem;
    }
  }
`;

export default ErrorPage;
