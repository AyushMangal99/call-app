import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdContact,IoIosSettings } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import { FaCircleDot } from "react-icons/fa6";

import './Footer.css'
function Footer() {
  return (
    <div className='footer'>
      <div className='footer-cont-1'>
        <button className='phone'><FaPhoneAlt size="35px"/><p>12</p></button>
        <button className='contact'><IoMdContact size="35px" color='#bebebe'/></button>
      </div>
      <div className='footer-cont-2'><button><TbGridDots size="35px" color='white'/></button></div>
      <div className='footer-cont-3'>
        <button className='Setting'><IoIosSettings size="35px" color='#bebebe'/></button>
        <button className='Dot'><FaCircleDot size="35px" color='#08f808'/></button>
      </div>
    </div>
  )
}

export default Footer