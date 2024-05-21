import React from 'react'
import "./Footer.scss"
import { NavLink } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareThreads } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";





const Footer = () => {
  return (
    <div className='footer'>
          <p>&copy;2024 FlyEasy.com </p>
          <p className='links'>
              <NavLink to="">Privacy</NavLink>
              <NavLink to="">About</NavLink>
        <NavLink to="">Contact</NavLink>
        <NavLink >-------------------------</NavLink>
        <NavLink to=""><FaFacebook />
</NavLink>
        <NavLink to=""><FaSquareInstagram />
</NavLink>
        <NavLink to=""><FaSquareThreads />
</NavLink>

<NavLink to=""><BsTwitterX />

</NavLink>
        

          </p>
    </div>
  )
}

export default Footer
