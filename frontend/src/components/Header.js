import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Nav from './Nav';

function Header() {

const MainHeader = styled.header`
padding: 0 4.8rem;
height: 10rem;
background-color: ${({theme})=> theme.colors.bg};
display: flex;
justify-content: space-between;
align-items: center;
position: relative;

.logo{
    height: 7rem;
}
`;
  return (
   <MainHeader>
    <NavLink to='/'>
    <img src="./images/logo3.jfif" alt='book logo' className='logo'/>
    </NavLink>
    <Nav/>
   </MainHeader>
  )
};



export default Header;
