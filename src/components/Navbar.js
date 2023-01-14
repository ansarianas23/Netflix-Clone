import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../components/Navbar.css'

const Navbar = () => {
    const[show, setShow] =useState(false);
    const navigate = useNavigate();

    const transitionNavBar = ()=>{
        if(window.scrollY > 100){
            setShow(true);
        }
        else{
            setShow(false);
        }
    };

    useEffect(()=>{
        window.addEventListener('scroll', transitionNavBar);
    },[])

  return (
    <div className={`nav ${show && "nav__black"}`}>
        <div className='nav__contents'>
            <img onClick={()=> navigate("/")} className='nav__logo' src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' alt='netflix-logo'/>
            <img onClick={()=>navigate("/profile")} className='nav__avatar' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='avatar-logo'/>
        </div>
    </div>
  )
}

export default Navbar
