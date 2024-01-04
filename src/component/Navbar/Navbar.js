import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { SiWhatsapp } from "react-icons/si";

function Navbar(props) {
  const [active,setActive]=useState(0)
  return (
    <div className='navbar-navbar'>
      <ul>
        <li onClick={()=>{props.setArchive_type(0);setActive(0)}} style={{border:active===0?'solid blue 1px':''}}><Link className='Activity' to='/'><SiWhatsapp size='35px' color='green'/><p>Activity</p></Link></li>
        <li onClick={()=>{props.setArchive_type(1);setActive(1)}} style={{border:active===1?'solid blue 1px':''}} className='archive-btn'>Archived</li>
        <li>All calls</li>
      </ul>
    </div>
  )
}

export default Navbar